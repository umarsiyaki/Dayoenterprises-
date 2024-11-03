const db = require('./dbConnection');

// Fetch all recipients
const getRecipients = async () => {
  const query = 'SELECT id, username FROM users';
  const [recipients] = await db.query(query);
  return recipients;
};

module.exports = { getRecipients };

const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');

// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Manager', 'Cashier'],
        default: 'Cashier'
    }
});

// Encrypt password before saving the user
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password for login
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
  // Register User
  exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    try {
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  };

  // Login User
  exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  };
  // models/userModel.js (using Sequelize as ORM)
const { DataTypes } = require('sequelize');
const db = require('../db/database.sql');

const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user', 'cashier'),
        defaultValue: 'user',
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    activationToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});
const bcrypt = require('bcrypt');
const Joi = require('joi');
const mysql = require('mysql2/promise');
const { generateToken } = require('../config/security');
const { sendEmail } = require('../config/email');
const twoFA = require('../config/twoFA');
const dbConfig = require('../config/database'); // Assuming you have a database config file

const userModel = {
  async createUser(name, email, password) {
    const validatedData = await validateUserInput(name, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await mysql.createConnection(dbConfig);

    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    await connection.execute(query, [name, email, hashedPassword]);

    await connection.end();
  },

  async getUserByEmail(email) {
    const connection = await mysql.createConnection(dbConfig);
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await connection.execute(query, [email]);

    await connection.end();
    return rows[0];
  },

  async getUserById(id) {
    const connection = await mysql.createConnection(dbConfig);
    const query = `SELECT * FROM users WHERE id = ?`;
    const [rows] = await connection.execute(query, [id]);

    await connection.end();
    return rows[0];
  },

  async requestPasswordReset(email) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const token = generateToken(user);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes expiration

    const connection = await mysql.createConnection(dbConfig);
    const query = `INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)`;
    await connection.execute(query, [user.id, token, expiresAt]);

    await connection.end();

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await sendEmail(email, 'Password Reset Request', `Reset your password: ${resetLink}`);
  },

  async resetPassword(token, newPassword) {
    const connection = await mysql.createConnection(dbConfig);
    const query = `SELECT * FROM password_resets WHERE token = ?`;
    const [rows] = await connection.execute(query, [token]);

    const passwordReset = rows[0];
    if (!passwordReset || new Date(passwordReset.expires_at) < Date.now()) {
      throw new Error('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateUserQuery = `UPDATE users SET password = ? WHERE id = ?`;
    await connection.execute(updateUserQuery, [hashedPassword, passwordReset.user_id]);

    const deleteResetQuery = `DELETE FROM password_resets WHERE user_id = ?`;
    await connection.execute(deleteResetQuery, [passwordReset.user_id]);

    await connection.end();
  },

  async enableTwoFA(userId, secret) {
    const connection = await mysql.createConnection(dbConfig);
    const query = `UPDATE users SET twoFA_secret = ? WHERE id = ?`;
    await connection.execute(query, [secret, userId]);

    await connection.end();
  },

  async verifyTwoFAToken(userId, token) {
    const user = await this.getUserById(userId);
    return twoFA.verifyToken(user.twoFA_secret, token);
  },

  async incrementLoginAttempts(userId) {
    const connection = await mysql.createConnection(dbConfig);
    const query = `UPDATE users SET login_attempts = login_attempts + 1 WHERE id = ?`;
    await connection.execute(query, [userId]);

    await connection.end();
  },

  async resetLoginAttempts(userId) {
    const connection = await mysql.createConnection(dbConfig);
    const query = `UPDATE users SET login_attempts = 0 WHERE id = ?`;
    await connection.execute(query, [userId]);

    await connection.end();
  },

  async isAccountLocked(userId) {
    const user = await this.getUserById(userId);
    return user.login_attempts >= 5;
  },

  async lockAccount(userId) {
    const connection = await mysql.createConnection(dbConfig);
    const query = `UPDATE users SET is_locked = 1 WHERE id = ?`;
    await connection.execute(query, [userId]);

    await connection.end();
  },

  async unlockAccount(userId) {
    const connection = await mysql.createConnection(dbConfig);
    const query = `UPDATE users SET is_locked = 0, login_attempts = 0 WHERE id = ?`;
    await connection.execute(query, [userId]);

    await connection.end();
  },

  async getUserProfile(userId) {
    const user = await this.getUserById(userId);
    return {
      name: user.name,
      email: user.email,
    };
  },

  async updateUserProfile(userId, profileData) {
    const connection = await mysql.createConnection(dbConfig);
    const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    await connection.execute(query, [profileData.name, profileData.email, userId]);

    await connection.end();
  },

  async requestMagicLink(email) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const token = generateToken(user);
    const link = `http://localhost:3000/login/${token}`;
    await sendEmail(email, 'Magic Link', `Login: ${link}`);
  },

  async addSecurityQuestion(userId, question, answer) {
    const connection = await mysql.createConnection(dbConfig);
    const query = `INSERT INTO security_questions (user_id, question, answer) VALUES (?, ?, ?)`;
    await connection.execute(query, [userId, question, answer]);

    await connection.end();
  },

  async verifySecurityAnswer(userId, question, answer) {
    const connection = await mysql.createConnection(dbConfig);
    const query = `SELECT * FROM security_questions WHERE user_id = ? AND question = ? AND answer = ?`;
    const [rows] = await connection.execute(query, [userId, question, answer]);

    await connection.end();
    return rows.length > 0;
  },

  async deleteAccount(userId) {
    const connection = await mysql.createConnection(dbConfig);
    const query = `DELETE FROM users WHERE id = ?`;
    await connection.execute(query, [userId]);

    await connection.end();
  },

  async sendNotification(userId, subject, body) {
    const user = await this.getUserById(userId);
    await sendEmail(user.email, subject, body);
  },
};

async function validateUserInput(name, email, password) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate({ name, email, password });
  if (error) {
    throw new Error(error.details[0].message);
  }

  return { name, email, password };
}

[10/13, 13:35] Meta AI: Here is the complete refactored `userModel.js` file:

```
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const mysql = require('mysql2/promise');
const { generateToken } = require('../config/security');
const { sendEmail } = require('../config/email');
const twoFA = require('../config/twoFA');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  twoFA_secret: String,
  login_attempts: Number,
  is_locked: Boolean,
  security_questions: [
    {
      question: String,
      answer: String,
    },
  ],
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

const dbConfig = require('../config/database');

const userModel = {
  async createUser(name, email, password) {
    const validatedData = await validateUserInput(name, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    return await user.save();
  },

  async getUserByEmail(email) {
    return await User.findOne({ email });
  },

  async getUserById(id) {
    return await User.findById(id);
  },

  async requestPasswordReset(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const token = generateToken(user);
    const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes
    const passwordReset = {
      user_id: user._id,
      token,
      expires_at: expiresAt,
    };
    // Save password reset data in database
    await passwordReset.save();
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await sendEmail(email, 'Password Reset Request', `Reset your password: ${resetLink}`);
  },

  async resetPassword(token, newPassword) {
    const passwordReset = await PasswordReset.findOne({ token });
    if (!passwordReset || passwordReset.expires_at < Date.now()) {
      throw new Error('Invalid or expired token');
    }
    const user = await User.findById(passwordReset.user_id);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    await PasswordReset.deleteMany({ user_id: user._id });
  },

  async enableTwoFA(userId, secret) {
    const user = await User.findById(userId);
    user.twoFA_secret = secret;
    await user.save();
  },

  async verifyTwoFAToken(userId, token) {
    const user = await User.findById(userId);
    return twoFA.verifyToken(user.twoFA_secret, token);
  },

  async incrementLoginAttempts(userId) {
    const user = await User.findById(userId);
    user.login_attempts += 1;
    await user.save();
  },

  async resetLoginAttempts(userId) {
    const user = await User.findById(userId);
    user.login_attempts = 0;
    await user.save();
  },

  async isAccountLocked(userId) {
    const user = await User.findById(userId);
    return user.login_attempts >= 5;
  },

  async lockAccount(userId) {
    const user = await User.findById(userId);
    user.is_locked = true;
    await user.save();
  },

  async unlockAccount(userId) {
    const user = await User.findById(userId);
    user.is_locked = false;
    user.login_attempts = 0;
    await user.save();
  },

  async getUserProfile(userId) {
    const user = await User.findById(userId);
    return {
      name: user.name,
      email: user.email,
    };
  },

  async updateUserProfile(userId, profileData) {
    const user = await User.findById(userId);
    user.name = profileData.name;
    user.email = profileData.email;
    await user.save();
  },

  async requestMagicLink(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const token = generateToken(user);
    const link = `http://localhost:3000/login/${token}`;
    await sendEmail(email, 'Magic Link', `Login: ${link}`);
  },

  async addSecurityQuestion(userId, question, answer) {
    const user = await User.findById(userId);
    user.security_questions.push({ question, answer });
    await user.save();
  },
-- SQL Table Structure for Users
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  googleId VARCHAR(255),
  facebookId VARCHAR(255),
  role ENUM('customer', 'wholesaler', 'admin') DEFAULT 'customer',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

  async verifySecurityAnswer(userId, question, answer) {
    const user = await User.findById(userId);
    const securityQuestion = user.security_questions.find(
      (q) => q.question === question && q.answer === answer
    );
    return securityQuestion !== undefined;
  },

  async deleteAccount(userId) {
    await User.findByIdAndDelete(userId);
  },

  async sendNotification(userId, subject, body) {
    const user = await User.findById(userId);
    await sendEmail(user.email, subject, body);
  },
};

async function validateUserInput(name, email, password) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate({ name, email, password });
  if (error) {
    throw new Error(error.details[0].message);
  }

  return { name, email, password };
}

module.exports = userModel;

const passwordResetSchema = new mongoose.Schema({
  user_id: sql.Schema.Types.ObjectId,
  token: String,
  expires_at: Date,
});

const PasswordReset = sql.model('PasswordReset', passwordResetSchema);

module.exports = User;

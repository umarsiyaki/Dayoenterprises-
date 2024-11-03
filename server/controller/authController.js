
// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
};

exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } else {
        res.status(400).send('Invalid credentials');
    }
};


// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

// Register User
exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ username, email, password, role });
        await user.save();

        const token = generateToken(user);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/userModel');
const { sendEmail } = require('../utils/mailer');
const { generateToken } = require('../utils/utils');

// Registration logic
const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
            activationToken: crypto.randomBytes(20).toString('hex'),
        });

        // Send activation email
        const activationUrl = `${req.protocol}://${req.get('host')}/auth/activate/${user.activationToken}`;
        await sendEmail(email, 'Account Activation', `Activate your account: ${activationUrl}`);

        res.status(201).json({ message: 'Registration successful. Check your email to activate your account.' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

// Login logic
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!user.isActivated) {
            return res.status(401).json({ message: 'Account not activated. Check your email.' });
        }

        // Generate JWT
        const token = generateToken(user);
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error during login', error: err.message });
    }
};

// Activate account
const activateAccount = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ where: { activationToken: token } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired activation token' });
        }

        user.isActivated = true;
        user.activationToken = null;
        await user.save();

        res.json({ message: 'Account activated successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error activating account', error: err.message });
    }
};

// Forgot Password
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send password reset email
        const resetUrl = `${req.protocol}://${req.get('host')}/auth/reset-password/${resetToken}`;
        await sendEmail(email, 'Password Reset', `Reset your password: ${resetUrl}`);

        res.json({ message: 'Password reset token sent to email.' });
    } catch (err) {
        res.status(500).json({ message: 'Error requesting password reset', error: err.message });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() },
            },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update password
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({ message: 'Password reset successful.' });
    } catch (err) {
        res.status(500).json({ message: 'Error resetting password', error: err.message });
    }
};

module.exports = {
    register,
    login,
    activateAccount,
    requestPasswordReset,
    resetPassword,
};
const bcrypt = require('bcrypt');
const passport = require('passport');
const { generateToken } = require('../config/security');
const twoFA = require('../config/twoFA');
const userModel = require('../models/userModel');
const { recaptchaVerify } = require('../config/recaptcha');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const { sendEmail } = require('../utils/email'); // Assuming you have a utility for sending emails

// Initialize logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'auth-log.txt' })
  ]
});

// Centralized response handler
const sendResponse = (res, status, message, data = null) => {
  res.status(status).send({ message, data });
};

// Rate limiter for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later.'
});

// Rate limiter for password reset requests
const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: 'Too many password reset requests, please try again later.'
});

// Password strength checker
const checkPasswordStrength = (password) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

// Login method
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return sendResponse(res, 400, 'Email and password are required.');
    }

    const user = await userModel.getUserByEmail(email);

    if (!user || !user.isVerified) {
      return sendResponse(res, 401, 'Invalid email or password, or account not verified.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      await userModel.incrementLoginAttempts(user.id);
      if (await userModel.isAccountLocked(user.id)) {
        await userModel.lockAccount(user.id);
        return sendResponse(res, 403, 'Account locked due to excessive login attempts');
      }
      return sendResponse(res, 401, 'Invalid email or password');
    }

    await userModel.resetLoginAttempts(user.id);
    const token = generateToken(user);
    sendResponse(res, 200, 'Login successful', { token });

    // Log successful login activity
    await userModel.logUserActivity(user.id, 'Login successful');
    
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    sendResponse(res, 500, 'Internal server error');
  }
};

// Register method with email verification
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return sendResponse(res, 400, 'Name, email, and password are required.');
    }

    if (!checkPasswordStrength(password)) {
      return sendResponse(res, 400, 'Password must be at least 8 characters long, include upper/lowercase letters, a number, and a special character.');
    }

    const userId = await userModel.createUser(name, email, password);
    
    // Send verification email
    await sendEmail(email, 'Verify your email', 'Please verify your email to complete registration.');

    sendResponse(res, 201, 'User created successfully. Please check your email to verify your account.', { userId });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    sendResponse(res, 500, 'Internal server error');
  }
};

// Email verification method
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const isVerified = await userModel.verifyUserEmail(token);
    if (!isVerified) {
      return sendResponse(res, 400, 'Invalid or expired verification token');
    }

    sendResponse(res, 200, 'Email verified successfully');
  } catch (error) {
    logger.error(`Email verification error: ${error.message}`);
    sendResponse(res, 500, 'Internal server error');
  }
};

// Enable 2FA method
const enableTwoFA = async (req, res) => {
  const userId = req.user.id;
  try {
    const secret = await twoFA.generateSecret();
    await userModel.enableTwoFA(userId, secret);
    sendResponse(res, 200, '2FA enabled', { secret: secret.ascii });
  } catch (error) {
    logger.error(`Enable 2FA error: ${error.message}`);
    sendResponse(res, 500, 'Internal server error');
  }
};

// Verify 2FA token method
const verifyTwoFAToken = async (req, res) => {
  const userId = req.user.id;
  const token = req.body.token;

  try {
    const isValid = await userModel.verifyTwoFAToken(userId, token);
    if (!isValid) {
      return sendResponse(res, 401, 'Invalid 2FA token');
    }
    sendResponse(res, 200, '2FA token verified successfully');
  } catch (error) {
    logger.error(`2FA verification error: ${error.message}`);
    sendResponse(res, 500, 'Internal server error');
  }
};

// Request password reset method
const requestPasswordReset = async (req, res) => {
  const email = req.body.email;

  try {
    await resetLimiter(req, res, async () => {
      const user = await userModel.getUserByEmail(email);
      if (!user) {
        return sendResponse(res, 404, 'Email not found');
      }

      await userModel.requestPasswordReset(email);
      sendResponse(res, 200, 'Password reset email sent');
    });
  } catch (error) {
    logger.error(`Password reset request error: ${error.message}`);
    sendResponse(res, 500, 'Internal server error');
  }
};

// Reset password method
const resetPassword = async (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.newPassword;

  try {
    if (!checkPasswordStrength(newPassword)) {
      return sendResponse(res, 400, 'Password must be at least 8 characters long, include upper/lowercase letters, a number, and a special character.');
    }

    await userModel.resetPassword(token, newPassword);
    sendResponse(res, 200, 'Password reset successfully');
  } catch (error) {
    logger.error(`Password reset error: ${error.message}`);
    sendResponse(res, 500, 'Internal server error');
  }
};

// Unlock account method
const unlockAccount = async (req, res) => {
  const userId = req.params.userId;

  try {
    await userModel.unlockAccount(userId);
    sendResponse(res, 200, 'Account unlocked');
  } catch (error) {
    logger.error(`Account unlock error: ${error.message}`);
    sendResponse(res, 500, 'Internal server error');
  }
};

// Passwordless login method
const passwordlessLogin = async (req, res) => {
  const email = req.body.email;

  try {
    await userModel.requestMagicLink(email);
    sendResponse(res, 200, 'Magic link sent');
  } catch (error) {
    logger.error(`Passwordless login error: ${error.message}`);
    sendResponse(res, 500, 'Internal server error');
  }
};

// Social login method
const socialLogin = (req, res) => {
  const provider = req.params.provider;
  passport.authenticate(provider, { scope: ['email', 'profile'] })(req, res);
};

// ReCAPTCHA login validation
const captchaLogin = async (req, res) => {
  const isValidCaptcha = await recaptchaVerify(req);
  if (!isValidCaptcha) {
    return sendResponse(res, 401, 'Invalid CAPTCHA');
  }
  // Further login logic goes here...
};

// Account deletion method
const requestAccountDeletion = async (req, res) => {
  const userId = req.user.id;

  try {
    await userModel.requestAccountDeletion(userId);
    sendResponse(res, 200, 'Account deletion requested');
  } catch (error) {
    logger.error(`Account deletion error: ${error.message}`);
    sendResponse(res, 500, 'Internal server error');
  }
};

module.exports = {
  login,
  register,
  verifyEmail,
  enableTwoFA,
  verifyTwoFAToken,
  requestPasswordReset,
  resetPassword,
  unlockAccount,
  passwordlessLogin,
  socialLogin,
  captchaLogin,
  requestAccountDeletion
};

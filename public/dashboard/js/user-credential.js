const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database'
});

app.post('/signup', (req, res) => {
  const { firstName, middleName, lastName, email, phoneNumber, address, password, nin } = req.body;
  const profilePic = req.file.filename;

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Insert user into database
  db.query('INSERT INTO Users SET ?', {
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    address,
    profilePic,
    password: hashedPassword,
    nin
  }, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error signing up');
    } else {
      res.send('Signed up successfully');
    }
  });
});

const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const csrf = require('csrf');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database'
});

const csrfProtection = csrf();

app.use(express.json());
app.use(csrfProtection);

app.post('/signup', (req, res) => {
  const { firstName, middleName, lastName, email, phoneNumber, address, password, nin } = req.body;
  const profilePic = req.file.filename;

  // Validate CSRF token
  if (!req.csrfToken()) {
    return res.status(403).send('Invalid CSRF token');
  }

  // Hash password with salt
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Generate email verification token
  const emailToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

  // Generate phone number verification token
  const phoneToken = speakeasy.generateSecret({ length: 6 });

  // Send email verification email
  const transporter = nodemailer.createTransport({
    host: '(link unavailable)',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Verify your email',
    text: `Verify your email by clicking this link: http://localhost:3000/verify-email?token=${emailToken}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });

  // Send phone number verification SMS
  const accountSid = 'your-twilio-account-sid';
  const authToken = 'your-twilio-auth-token';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      from: 'your-twilio-phone-number',
      body: `Your verification code is: ${phoneToken}`,
      to: phoneNumber
    })
    .then((message) => console.log(message.sid))
    .done();

  // Insert user into database
  db.query('INSERT INTO Users SET ?', {
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    address,
    profilePic,
    password: hashedPassword,
    nin,
    emailVerified: 0,
    phoneVerified: 0
  }, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error signing up');
    } else {
      res.send('Signed up successfully');
    }
  });
});
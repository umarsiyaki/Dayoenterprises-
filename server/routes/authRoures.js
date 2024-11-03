const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;
const express = require('express');
const authController = require('../controllers/authController');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/request-password-reset', authController.requestPasswordReset);
router.patch('/reset-password/:token', authController.resetPassword);

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/enable-2fa', authController.enableTwoFA);
router.post('/verify-2fa-token', authController.verifyTwoFAToken);
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.patch('/unlock-account/:userId', authController.unlockAccount);
const authRoutes = {
  // ...

  router.post('/passwordless-login', authController.passwordlessLogin);
};

const express = require('express');
const router = express.Router();
const passport = require('../config/auth');
const db = require('../db');
const { hashPassword } = require('../config/password');

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const [result] = await db.execute('INSERT INTO Users SET ?', { username, email, password: hashedPassword });
    res.json({ id: result.insertId, username, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

const { passport, sendWhatsAppOTP, verifyWhatsAppOTP } = require('../auth');
const { ensureRole } = require('../middleware/authMiddleware');

const router = express.Router();

// Local login
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard');
});

// Google login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard');
});

// Facebook login
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard');
});

// WhatsApp OTP
router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    await sendWhatsAppOTP(phoneNumber);
    res.status(200).send('OTP sent');
  } catch (error) {
    res.status(500).send('Error sending OTP');
  }
});

router.post('/verify-otp', async (req, res) => {
  const { phoneNumber, code } = req.body;
  try {
    const verificationResult = await verifyWhatsAppOTP(phoneNumber, code);
    if (verificationResult.status === 'approved') {
      req.login(user, (err) => {
        if (err) return res.status(500).send('Error logging in');
        res.status(200).send('OTP verified');
      });
    } else {
      res.status(400).send('Invalid OTP');
    }
  } catch (error) {
    res.status(500).send('Error verifying OTP');
  }
});

module.exports = router;
const express = require('express');
const {
    register,
    login,
    getProfile,
    updateProfile,
    logout,
    requestPasswordReset,
    resetPassword,
    changePassword,
    activateAccount,
    refreshToken
} = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route (invalidate session or token)
router.post('/logout', authMiddleware, logout);

// Get user profile
router.get('/profile', authMiddleware, getProfile);

// Update user profile
router.put('/profile', authMiddleware, updateProfile);

// Request password reset (email)
router.post('/password-reset/request', requestPasswordReset);

// Reset password with token
router.post('/password-reset/:token', resetPassword);

// Change password (user logged in)
router.put('/password-change', authMiddleware, changePassword);

// Activate account (email verification)
router.get('/activate/:token', activateAccount);

// Refresh token
router.post('/refresh-token', refreshToken);
// routes/authRoutes.js
const { register, login, activateAccount, requestPasswordReset, resetPassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/activate/:token', activateAccount);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

// Protected routes
router.get('/profile', authMiddleware(), (req, res) => {
    res.json({ message: 'This is a protected route.', user: req.user });
});


router.get('/admin-dashboard', checkRole(['admin']), (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard' });
});
module.exports = router;


// controllers/userController.js
const User = require('../models/userModel');

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a User
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const db = require('../config/database');

exports.getUser = async (req, res) => {
  const [users] = await db.execute('SELECT * FROM Users');
  res.render('users', { users });
};

exports.createUser = async (req, res) => {
  const { name, email, role } = req.body;
  await db.execute('INSERT INTO Users SET ?', { name, email, role });
  res.redirect('/users');
};

const getUserProfile = async (req, res) => {
  const userId = ('../model/userModel');
  const profile = await userModel.getUserProfile(userId);
  res.send(profile);
};

const updateUserProfile = async (req, res) => {
  const userId = ('../models/userModel');
  const profileData = req.body;
  await userModel.updateUserProfile(userId, profileData);
  res.send({ message: 'Profile updated successfully' });
};
const upload = require('../config/upload');

const uploadProfilePicture = async (req, res) => {
  const userId = ('../config/upload');
  const file = req.file;
  // Process uploaded file...
  res.send({ message: 'Profile picture uploaded' });
};
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/profile-picture', upload.single('profilePicture'), userController.uploadProfilePicture);
const userController = {
  // ...

  async addSecurityQuestion(req, res) {
    const userId = ('../model/userModel');
    const question = req.body.question;
    const answer = req.body.answer;
    await userModel.addSecurityQuestion(userId, question, answer);
    res.send({ message: 'Security question added' });
  },

  async verifySecurityAnswer(req, res) {
    const userId = ('../js/userCredentials');
    const question = req.body.question;
    const answer = req.body.answer;
    const isValid = await userModel.verifySecurityAnswer(userId, question, answer);
    if (!isValid) {
      return res.status(401).send('Invalid answer');
    }
    res.send({ message: 'Answer verified' });
  }
};
const userController = {
  // ...

  async deleteAccount(req, res) {
    const userId = ('../js/usercredentil');
    await userModel.deleteAccount(userId);
    res.send({ message: 'Account deleted' });
  }
  async sendNotification(req, res) {
  const userId = (link unavailable);
  const subject = req.body.subject;
  const body = req.body.body;
  await userModel.sendNotification(userId, subject, body);
  res.send({ message: 'Notification sent' });
}
};
module.exports = router;
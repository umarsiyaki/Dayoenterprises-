const express = require('express');
const router = express.Router();

// Profile information form
router.get('/profile', (req, res) => {
  // Retrieve profile information from database
  const profile = {};
  res.render('profile', { profile });
});

// Password update form
router.post('/update-password', (req, res) => {
  // Update password in database
  res.send('Password updated successfully!');
});

//NIN update 
router.post('/update-nin', (req, res) => {
  // Update NiN in database
  res.send('nin updated successfully!');
});

// Profile picture upload
router.post('/upload-profile-picture', (req, res) => {
  // Upload profile picture to server
  res.send('Profile picture uploaded successfully!');
});

// userProfiling.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const UserProfiling = () => {
  const [userProfile, setUserProfile] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      const response = await axios.get('/api/user/data');
      setUserProfile(response.data);
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <p>image: {userProfile.image}</p>
      <p>Nin: {userProfile.nin}</p>
      <p>phone: {userProfile.phone}</p>
      <p>dob: {userProfile.dob}</p>
      <p>username: {userProfile.username}</p>
    </div>
  );
};
module.exports = router;
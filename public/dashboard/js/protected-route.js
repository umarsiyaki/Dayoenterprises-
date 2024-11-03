const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use((req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    req.userId = decoded.userId;
    next();
  });
});

app.get('/protected', (req, res) => {
  res.send(`Welcome, user ${req.userId}!`);
});
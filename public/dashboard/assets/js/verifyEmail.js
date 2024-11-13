const express = require('express');
const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database'
});

app.get('/verify-email', (req, res) => {
  const token = req.query.token;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    const email = decoded.email;

    db.query('UPDATE Users SET emailVerified = 1 WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error verifying email');
      } else {
        res.send('Email verified successfully');
      }
    });
  });
});
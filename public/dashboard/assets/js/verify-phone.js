const express = require('express');
const app = express();
const mysql = require('mysql');
const speakeasy = require('speakeasy');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'database'
});

app.post('/verify-phone', (req, res) => {
  const { phoneNumber, token } = req.body;

  db.query('SELECT phoneToken FROM Users WHERE phoneNumber = ?', [phoneNumber], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error verifying phone');
    } else {
      const phoneToken = results[0].phoneToken;

      const verified = speakeasy.totp.verify({
        secret: phoneToken,
        encoding: 'base32',
        token: token
      });

      if (!verified) {
        return res.status(401).send('Invalid token');
      }

      db.query('UPDATE Users SET phoneVerified = 1 WHERE phoneNumber = ?', [phoneNumber], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error verifying phone');
        } else {
          res.send('Phone verified successfully');
        }
      });
    }
  });
});
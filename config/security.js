const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'your-secret-key';
const saltRounds = 10;

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
};

const hashPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = { generateToken, hashPassword, comparePassword };
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'your-secret-key';
const saltRounds = 10;


const hashPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = { generateToken, hashPassword, comparePassword };
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    sub: user._id,
    exp: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
  };
  return jwt.sign(payload, process.env.SECRET_KEY);
};

module.exports = { generateToken };

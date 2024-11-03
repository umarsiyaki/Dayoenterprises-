const expressSession = require('express-session');

const sessionConfig = {
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
};

module.exports = sessionConfig;
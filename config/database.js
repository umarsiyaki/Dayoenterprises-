const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'project'
};

const db = mysql.createPool(dbConfig);

db.getConnection().then((connection) => {
  console.log('Connected to MySQL');
}).catch((err) => {
  console.error('Error connecting to MySQL:', err);
});

module.exports = db;
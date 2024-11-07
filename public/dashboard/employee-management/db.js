
// backend/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // Update with your MySQL password
    database: 'employee_management' // The name of the database
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

module.exports = db;
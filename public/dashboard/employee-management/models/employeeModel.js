const db = require('../db');

const Employee = {
  getAllEmployees: (callback) => {
    const query = 'SELECT * FROM employees';
    db.query(query, callback);
  },
  addEmployee: (employee, callback) => {
    const query = 'INSERT INTO employees (name, position, department) VALUES (?, ?, ?)';
    db.query(query, [employee.name, employee.position, employee.department], callback);
  },
  // Additional employee operations (update, delete, etc.)
};

module.exports = Employee;
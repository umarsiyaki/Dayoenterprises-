
// backend/models/attendanceModel.js
const db = require('../db');

const Attendance = {
    markAttendance: (attendance, callback) => {
        const query = 'INSERT INTO attendance (employee_id, check_in, status) VALUES (?, NOW(), ?)';
        db.query(query, [attendance.employee_id, attendance.status], callback);
    },
    getAttendanceByEmployeeId: (employeeId, callback) => {
        const query = 'SELECT * FROM attendance WHERE employee_id = ?';
        db.query(query, [employeeId], callback);
    },
};

module.exports = Attendance;
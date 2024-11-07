
// backend/controllers/attendanceController.js
const Attendance = require('../models/attendanceModel');

exports.markAttendance = (req, res) => {
    const { employee_id, status } = req.body;
    Attendance.markAttendance({ employee_id, status }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to mark attendance' });
        }
        res.status(200).json({ message: 'Attendance marked successfully', result });
    });
};

exports.getAttendance = (req, res) => {
    const { employeeId } = req.params;
    Attendance.getAttendanceByEmployeeId(employeeId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch attendance' });
        }
        res.status(200).json(result);
    });
};
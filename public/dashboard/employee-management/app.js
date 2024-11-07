
const express = require('express');
const db = require('./db');
const attendanceRoutes = require('./routes/attendanceRoutes');
const payrollRoutes = require('./routes/payrollRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve HTML, CSS, and JS from the /public folder

// Routes
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payroll', payrollRoutes);
// Add other routes as needed

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
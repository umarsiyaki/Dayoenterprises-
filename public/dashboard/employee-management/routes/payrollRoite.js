// backend/routes/payrollRoutes.js
const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');

router.get('/', payrollController.getAllPayrollRecords);
router.post('/process', payrollController.processPayroll);

module.exports = router;
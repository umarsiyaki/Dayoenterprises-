
const express = require('express');
const loginHistoryController = require('../controllers/loginHistoryController');

const router = express.Router();

router.post('/record-login', loginHistoryController.recordLogin);
router.get('/login-history', loginHistoryController.getLoginHistory);

module.exports = router;
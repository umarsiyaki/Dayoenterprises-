const loginHistoryModel = require('../models/loginHistoryModel');

const recordLogin = async (req, res) => {
  const userId = (link unavailable);
  const ipAddress = req.ip;
  const userAgent = req.headers['user-agent'];
  await loginHistoryModel.recordLogin(userId, ipAddress, userAgent);
  res.send({ message: 'Login recorded' });
};

const getLoginHistory = async (req, res) => {
  const userId = (link unavailable);
  const history = await loginHistoryModel.getLoginHistory(userId);
  res.send(history);
};
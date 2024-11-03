const ipBlockModel = require('../config/ipBlock');

const ipBlockMiddleware = async (req, res, next) => {
  const ip = req.ip;
  const isBlocked = await ipBlockModel.isIpBlocked(ip);

  if (isBlocked) {
    return res.status(403).send('Your IP address is blocked.');
  }

  next();
};

module.exports = ipBlockMiddleware;
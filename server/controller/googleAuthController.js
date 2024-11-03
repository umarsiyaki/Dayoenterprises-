const googleAuth = require('../config/googleAuth');

const generateQRCode = async (req, res) => {
  const userId = (link unavailable);
  const token = await googleAuth.generateQRCode(userId);
  res.send({ token });
};

const verifyToken = async (req, res) => {
  const userId = (link unavailable);
  const token = req.body.token;
  const isValid = await googleAuth.verifyToken(token, userId);
  if (!isValid) {
    return res.status(401).send('Invalid token');
  }
  res.send({ message: 'Token verified' });
};
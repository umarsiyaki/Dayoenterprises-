const googleAuthenticator = require('google-authenticator');

const secret = 'your-secret-key';

const googleAuth = {
  async generateQRCode(userId) {
    const token = googleAuthenticator.generateToken({
      secret,
      label: `your-app-name:${userId}`
    });
    return token;
  },

  async verifyToken(token, userId) {
    return googleAuthenticator.verify({
      secret,
      token
    });
  }
};
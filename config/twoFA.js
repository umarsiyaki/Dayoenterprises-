const speakeasy = require('speakeasy');

const twoFA = {
  async generateSecret() {
    return speakeasy.generateSecret({
      name: 'oladay enterprises',
      length: 6
    });
  },

  async verifyToken(secret, token) {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token
    });
  }
};

module.exports = twoFA;
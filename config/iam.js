
const passport = require('passport');

const iamConfig = {
  // ...
};

const authenticateUser = async (userData) => {
  const user = await passport.authenticate('local', userData);
  return user;
};
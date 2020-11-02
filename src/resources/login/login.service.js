const userService = require('../users/user.service');
// const User = require('../users/user.model');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const signToken = async userCreds => {
  const user = await userService.getByCreds(userCreds);
  if (!user) {
    return null;
  }
  const { _id: userId, login } = user;
  const token = jwt.sign({ userId, login }, JWT_SECRET_KEY, {
    expiresIn: '1h'
  });
  return token;
};

module.exports = { signToken };

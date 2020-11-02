const bcrypt = require('bcrypt');
const { DEFAULT_SALT_ROUNDS } = require('../common/config');

const hashPassword = async password =>
  await bcrypt.hash(password, +DEFAULT_SALT_ROUNDS);

const checkHashedPassword = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);

module.exports = {
  hashPassword,
  checkHashedPassword
};

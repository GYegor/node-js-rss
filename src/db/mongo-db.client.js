const { connect, connection: db } = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');
const { hashPassword } = require('../utils/hashHelpers');

const admin = {
  name: 'Admin',
  login: 'admin',
  password: 'admin'
};

const protectUser = async user => {
  const password = await hashPassword(user.password);
  return { ...user, password };
};

const connectToDB = cb => {
  connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    db.dropDatabase();
    const mockAdminUser = await protectUser(admin);
    User.create(mockAdminUser);
    console.log('Connected to DB!');
    cb();
  });
};

module.exports = { connectToDB };

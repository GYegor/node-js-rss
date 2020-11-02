const { connect, connection: db } = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');

const connectToDB = cb => {
  connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    db.dropDatabase();
    User.create({
      login: 'admin',
      password: 'admin'
    });
    console.log('Connected to DB!');
    cb();
  });
};

module.exports = { connectToDB };

const User = require('../resources/users/user.model');

const db = {
  users: []
};

const initDb = () => {
  for (let i = 0; i < 5; i++) {
    db.users.push(
      new User({
        name: `User-${i + 1}`,
        login: `User's-${i + 1} login`,
        password: Math.random()
          .toString(36)
          .substring(2, 8)
      })
    );
  }
};
initDb();

module.exports = db;

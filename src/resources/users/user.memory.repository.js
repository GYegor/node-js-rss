const db = require('../../db/inMemoryDB');
const User = require('./user.model');

const getAll = async () => {
  return db.users;
};

const getById = async id => {
  const user = await db.users.find(u => u.id === id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const add = async body => {
  const newUser = new User(body);
  db.users.push(newUser);
  return newUser;
};

const update = async (id, body) => {
  const user = await db.users.find(u => u.id === id);
  if (!user) {
    throw new Error('User not found');
  }
  Object.assign(user, body);
  return user;
};

const remove = async id => {
  const userIndex = await db.users.findIndex(user => user.id === id);

  const [deletedUser] = db.users.splice(userIndex, 1);
  return deletedUser.id;
};

module.exports = { getAll, getById, add, update, remove };

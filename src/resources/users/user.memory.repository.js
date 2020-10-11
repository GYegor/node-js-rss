const db = require('../../db/inMemoryDB');
const User = require('./user.model');

const getAll = async () => {
  return db.users;
};

const getById = async id => {
  const user = db.users.find(u => u.id === id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const add = async body => {
  const newUser = new User(body);
  db.users.push(newUser);
  return newUser.id;
};

const update = async (id, body) => {
  const userIndex = db.users.findIndex(user => user.id === id);
  db.users[userIndex] = { ...db.users[userIndex], ...body };
  // Object.assign(db.users[userIndex], body);
  return id;
};

const remove = async id => {
  const userIndex = db.users.findIndex(user => user.id === id);
  db.users.splice(userIndex, 1);
};

module.exports = { getAll, getById, add, update, remove };

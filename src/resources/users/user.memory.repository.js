const DB = require('../../db/inMemoryDB');
const User = require('./user.model');

const getAll = async () => {
  return DB.getAllItems('users');
};

const getById = async id => {
  const user = DB.getItem('users', id);
  return user;
};

const create = async body => {
  const newUser = new User(body);
  return DB.addItem('users', newUser);
};

const update = async (id, body) => {
  const user = DB.updateItem('users', id, body);
  return user;
};

const remove = async id => {
  const isRemoved = DB.removeItem('users', id);
  return isRemoved;
};

module.exports = { getAll, getById, create, update, remove };

const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

// #region init DB
const db = {
  users: [new User(), new User(), new User(), new User(), new User()],
  boards: [new Board(), new Board(), new Board()],
  tasks: [
    new Task(),
    new Task(),
    new Task(),
    new Task(),
    new Task(),
    new Task()
  ]
};

const getAllItems = tableName => {
  return db[tableName];
};

const getItem = (tableName, id) => {
  const items = db[tableName].filter(item => item.id === id);
  if (items.length > 1) {
    throw Error('DB inconsistency');
  }
  return items[0];
};

const addItem = (tableName, newItem) => {
  const table = db[tableName];
  table.push(newItem);
  return table.find(item => item.id === newItem.id);
};

const updateItem = (tableName, id, newItem) => {
  const table = db[tableName];
  const idx = table.findIndex(oldItem => oldItem.id === id);
  if (idx > -1) {
    table[idx] = {
      ...table[idx],
      ...newItem
    };
    return table[idx];
  }
  return undefined;
};

const removeItem = (tableName, id) => {
  const table = db[tableName];
  const idx = table.findIndex(item => item.id === id);
  if (idx > -1) {
    table.splice(idx, 1);
    return true;
  }
  return undefined;
};

const removeItemsByParentId = (tableName, parentIdName, parentId) => {
  const table = db[tableName];
  const filteredTable = table.filter(item => item[parentIdName] !== parentId);
  db[tableName] = filteredTable;
  if (filteredTable.length < table.lebgth) {
    return true;
  }
  return undefined;
};

module.exports = {
  getAllItems,
  getItem,
  addItem,
  updateItem,
  removeItem,
  removeItemsByParentId
};

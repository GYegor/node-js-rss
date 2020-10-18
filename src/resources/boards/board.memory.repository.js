const DB = require('../../db/inMemoryDB');
const Board = require('./board.model');

const getAll = async () => {
  return DB.getAllItems('boards');
};

const getById = async id => {
  const board = DB.getItem('boards', id);
  return board;
};

const create = async body => {
  const newBoard = new Board(body);
  return DB.addItem('boards', newBoard);
};

const update = async (id, body) => {
  const board = DB.updateItem('boards', id, body);
  return board;
};

const remove = async id => {
  const isRemoved = DB.removeItem('boards', id);
  return isRemoved;
};

module.exports = { getAll, getById, create, update, remove };

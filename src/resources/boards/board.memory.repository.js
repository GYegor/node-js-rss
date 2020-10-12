const db = require('../../db/inMemoryDB');
const Board = require('./board.model');

const getAll = async () => {
  return db.boards;
};

const getById = async id => {
  const board = await db.boards.find(u => u.id === id);
  if (!board) {
    throw new Error('Board not found');
  }
  return board;
};

const add = async body => {
  const newBoard = new Board(body);
  db.boards.push(newBoard);
  return newBoard;
};

const update = async (id, body) => {
  const board = await db.boards.find(u => u.id === id);
  if (!board) {
    throw new Error('Board not found');
  }
  Object.assign(board, body);
  return board;
};

const remove = async id => {
  const boardIndex = await db.boards.findIndex(board => board.id === id);
  if (!boardIndex < 0) {
    throw new Error('Board not found');
  }
  db.boards.splice(boardIndex, 1);
};

module.exports = { getAll, getById, add, update, remove };

const tasksRepo = require('./task.memory.repository');

const getAllAtBoard = boardId => tasksRepo.getAllAtBoard(boardId);
const getByIdAtBoard = (boardId, id) => tasksRepo.getByIdAtBoard(boardId, id);
const addToBoard = (boardId, reqBody) => tasksRepo.addToBoard(boardId, reqBody);
const updateAtBoard = (boardId, id, reqBody) =>
  tasksRepo.updateAtBoard(boardId, id, reqBody);
const removeFromBoard = (boardId, id) => tasksRepo.removeFromBoard(boardId, id);
const clearBoardTasks = boardId => tasksRepo.removeTasksByBoardId(boardId);
const clearUserTaskRef = userId => tasksRepo.clearUserTaskRef(userId);

module.exports = {
  getAllAtBoard,
  getByIdAtBoard,
  addToBoard,
  updateAtBoard,
  removeFromBoard,
  clearUserTaskRef,
  clearBoardTasks
};

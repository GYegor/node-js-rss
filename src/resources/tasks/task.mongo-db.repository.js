const Task = require('./task.model');

const getAllAtBoard = async boardId => Task.find({ boardId });

const getByIdAtBoard = async (boardId, id) =>
  Task.findOne({ boardId, _id: id });

const addToBoard = async (boardId, body) => Task.create({ ...body, boardId });

const updateAtBoard = async (boardId, id, body) =>
  Task.updateOne({ _id: id, boardId }, body);

const removeFromBoard = async (boardId, id) =>
  (await Task.deleteOne({ _id: id })).ok;

const removeTasksByBoardId = async deletedBoardId =>
  (await Task.deleteMany({ boardId: deletedBoardId })).ok;

const clearUserTaskRef = async deletedUserId =>
  Task.updateMany({ userId: deletedUserId }, { $set: { userId: null } });

module.exports = {
  getAllAtBoard,
  getByIdAtBoard,
  addToBoard,
  updateAtBoard,
  removeFromBoard,
  removeTasksByBoardId,
  clearUserTaskRef
};

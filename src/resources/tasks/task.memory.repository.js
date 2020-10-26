const DB = require('../../db/in-memory.db');
const Task = require('./task.model');

const getAllAtBoard = async boardId => {
  const allTasksAtBoard = DB.getAllItems('tasks').filter(
    task => task.boardId === boardId
  );
  return allTasksAtBoard;
};

const getByIdAtBoard = async (boardId, id) => {
  const boardTasks = await getAllAtBoard(boardId);
  const taskAtBoard = boardTasks.find(task => task.id === id);
  return taskAtBoard;
};

const addToBoard = async (boardId, body) => {
  const newTask = new Task(body);
  newTask.boardId = boardId;
  return DB.addItem('tasks', newTask);
};

const updateAtBoard = async (boardId, id, body) => {
  const boardTasks = await getAllAtBoard(boardId);
  const task = boardTasks.find(t => t.id === id);
  return DB.updateItem('tasks', task.id, body);
};

const clearUserTaskRef = async deletedUserId => {
  const allTasks = DB.getAllItems('tasks');
  allTasks.forEach(task => {
    if (task.userId === deletedUserId) {
      task.userId = null;
    }
  });
  return allTasks;
};

const removeTasksByBoardId = async deletedBoardId => {
  const tasksRemoved = DB.removeItemsByParentId(
    'tasks',
    'boardId',
    deletedBoardId
  );
  return tasksRemoved;
};

const removeFromBoard = async (boardId, id) => {
  const isRemoved = DB.removeItem('tasks', id);
  return isRemoved;
};

module.exports = {
  getAllAtBoard,
  getByIdAtBoard,
  addToBoard,
  updateAtBoard,
  removeFromBoard,
  removeTasksByBoardId,
  clearUserTaskRef
};

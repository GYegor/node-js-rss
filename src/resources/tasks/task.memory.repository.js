const db = require('../../db/inMemoryDB');
const Task = require('./task.model');

const getAllAtBoard = async boardId => {
  const tasks = await db.tasks.filter(t => t.boardId === boardId);
  return tasks.length ? tasks : [{}];
};

const getByIdAtBoard = async (boardId, id) => {
  const task = await db.tasks.find(t => t.id === id && t.boardId === boardId);
  return task;
};

const addToBoard = async (boardId, body) => {
  const newTask = new Task(body);
  newTask.boardId = boardId;
  await db.tasks.push(newTask);
  return newTask;
};

const updateAtBoard = async (boardId, id, body) => {
  const task = await db.tasks.find(u => u.boardId === boardId && u.id === id);
  if (!task) {
    throw new Error('Task not found');
  }
  Object.assign(task, body);
  return task;
};

const removeFromBoard = async (boardId, id) => {
  const taskIndex = await db.tasks.findIndex(task => task.id === id);
  db.tasks.splice(taskIndex, 1);
};

const clearUserTaskRef = async deletedUserId => {
  await db.tasks.forEach(task => {
    if (task.userId === deletedUserId) {
      task.userId = null;
    }
  });
};

const clearBoardTasks = async deletedBoardId => {
  const tmpDb = await db.tasks.filter(task => task.boardId !== deletedBoardId);
  // eslint-disable-next-line require-atomic-updates
  db.tasks = tmpDb;
  return db.tasks;
};

module.exports = {
  getAllAtBoard,
  getByIdAtBoard,
  addToBoard,
  updateAtBoard,
  removeFromBoard,
  clearUserTaskRef,
  clearBoardTasks
};

const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const add = reqBody => boardsRepo.add(reqBody);
const update = (id, reqBody) => boardsRepo.update(id, reqBody);
const remove = id => boardsRepo.remove(id);
const clearBoardTasks = id => tasksService.clearBoardTasks(id);

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  clearBoardTasks
};

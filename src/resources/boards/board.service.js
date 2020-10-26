const boardsRepo = require('./board.mongo-db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const create = reqBody => boardsRepo.create(reqBody);
const update = (id, reqBody) => boardsRepo.update(id, reqBody);
const remove = async id => {
  await tasksService.clearBoardTasks(id);
  return await boardsRepo.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};

const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const create = reqBody => usersRepo.create(reqBody);
const update = (id, reqBody) => usersRepo.update(id, reqBody);
const remove = async id => {
  await tasksService.clearUserTaskRef(id);
  return await usersRepo.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};

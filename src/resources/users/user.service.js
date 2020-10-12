const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const add = reqBody => usersRepo.add(reqBody);
const update = (id, reqBody) => usersRepo.update(id, reqBody);
const remove = id => usersRepo.remove(id);
const clearDeletedUserTaskRef = id => tasksService.clearUserTaskRef(id);

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  clearDeletedUserTaskRef
};

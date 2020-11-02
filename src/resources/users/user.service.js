const usersRepo = require('./user.mongo-db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const getByCreds = userCreds => usersRepo.getByCreds(userCreds);
const create = reqBody => usersRepo.create(reqBody);
const update = (id, reqBody) => usersRepo.update(id, reqBody);
const remove = async id => {
  await tasksService.clearUserTaskRef(id);
  return await usersRepo.remove(id);
};

module.exports = {
  getAll,
  getById,
  getByCreds,
  create,
  update,
  remove
};

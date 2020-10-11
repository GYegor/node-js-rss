const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const add = reqBody => usersRepo.add(reqBody);
const update = (id, reqBody) => usersRepo.update(id, reqBody);
const remove = id => usersRepo.remove(id);

module.exports = { getAll, get: getById, add, update, remove };

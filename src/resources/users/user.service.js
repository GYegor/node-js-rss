const usersRepo = require('./user.mongo-db.repository');
const tasksService = require('../tasks/task.service');
const { hashPassword, checkHashedPassword } = require('../../utils');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const getByProps = props => usersRepo.getByProps(props);

const getByCreds = async userCreds => {
  const { login, password } = userCreds;
  const userToCheck = await getByProps({ login });

  if (userToCheck) {
    const { password: hashedPassword } = userToCheck;
    const isPasswordMatch = await checkHashedPassword(password, hashedPassword);

    return isPasswordMatch && userToCheck;
  }

  return null;
};

const create = async reqBody => {
  const { password } = reqBody;
  const hashedPassword = await hashPassword(password);
  return usersRepo.create({ ...reqBody, password: hashedPassword });
};

const update = (id, reqBody) => usersRepo.update(id, reqBody);

const remove = async id => {
  await tasksService.clearUserTaskRef(id);
  return await usersRepo.remove(id);
};

module.exports = {
  getAll,
  getById,
  getByProps,
  getByCreds,
  create,
  update,
  remove
};

const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const taskRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const create = async ({ name, login, password }) => {
  const newUser = new User({ name, login, password });
  await usersRepo.create(newUser);

  return newUser;
};

const update = async (user, { name, login, password }) => {
  const updatedUser = new User({
    ...user,
    ...(name && { name }),
    ...(login && { login }),
    ...(password && { password }),
  });
  await usersRepo.update(updatedUser);

  return updatedUser;
};

const getUser = userId => usersRepo.getUser(userId);

const deleteUser = async userId => {
  await usersRepo.deleteUser(userId);
  await taskRepo.clearTaskUserId(userId);

  return true;
};

module.exports = { getAll, create, update, getUser, deleteUser };

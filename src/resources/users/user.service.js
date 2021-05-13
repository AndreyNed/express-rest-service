const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const create = ({ name, login, password }) => usersRepo.create({ name, login, password });

const update = ({ id, name, login, password }) => usersRepo.update({ id, name, login, password });

const getUser = userId => usersRepo.getUser(userId);

const deleteUser = userId => usersRepo.deleteUser(userId);

module.exports = { getAll, create, update, getUser, deleteUser };

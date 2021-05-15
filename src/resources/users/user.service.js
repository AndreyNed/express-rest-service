const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const create = payload => usersRepo.create(payload);

const update = (user, payload) => usersRepo.update(user, payload);

const getUser = userId => usersRepo.getUser(userId);

const deleteUser = userId => usersRepo.deleteUser(userId);

module.exports = { getAll, create, update, getUser, deleteUser };

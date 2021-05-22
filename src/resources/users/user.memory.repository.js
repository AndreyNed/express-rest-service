const path = require('path');

const User = require('./user.model');
const { DATA_PATH } = require('../../common/config');
const createGetDataFromFile = require('../../utils/create.get.data.from.file');
const createSaveDataToFile = require('../../utils/create.save.data.to.file');
const taskRepo = require('../tasks/task.memory.repository');

class UserMemoryRepositoryError {
  constructor(message = 'unknown error') {
    this.status = 503;
    this.message = `User memory repository error: ${message}`;
  }
}

const fileName = path.resolve(DATA_PATH, 'users.json');
const readUsers = createGetDataFromFile(fileName, UserMemoryRepositoryError);
const saveUsers = createSaveDataToFile(fileName);

const throwUserRepositoryError = (e, message) => {
  process.stderr.write(e);
  throw new UserMemoryRepositoryError(message);
};

const getAll = async () => {
  try {
    return await readUsers();
  } catch (e) {
    return throwUserRepositoryError(e, 'users data is wrong or not available');
  }
};

const getUser = async userId => {
  const users = await getAll();
  const user = users.find(({ id }) => id === userId);
  if (!user) {
    throw Object.create({ status: 404, message: 'User not found' });
  }

  return user;
};

const create = async ({ name, login, password }) => {
  const users = await getAll();
  const newUser = new User({ name, login, password });
  users.push(newUser);
  try {
    await saveUsers(users);

    return newUser;
  } catch (e) {
    return throwUserRepositoryError(e, 'user was not created');
  }
};

const update = async (user, { name, login, password }) => {
  const updated = new User({
    ...user,
    ...(name && { name }),
    ...(login && { login }),
    ...(password && { password }),
  });
  try {
    const users = (await getAll()).map(cur => (
      cur.id === user.id ? updated : cur
    ));
    await saveUsers(users);

    return updated;
  } catch (e) {
    return throwUserRepositoryError(e, 'user was not updated');
  }
}

const deleteUser = async userId => {
  let users = await getAll();
  try {
    users = users.filter(({ id }) => id !== userId);
    await saveUsers(users);
    await taskRepo.clearTaskUserId(userId);

    return true;
  } catch (e) {
    return throwUserRepositoryError(e, 'user was not deleted');
  }
};

module.exports = { getAll, create, update, getUser, deleteUser };

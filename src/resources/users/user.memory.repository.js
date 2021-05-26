const path = require('path');

const { DATA_PATH } = require('../../common/config');
const createGetDataFromFile = require('../../utils/create.get.data.from.file');
const createSaveDataToFile = require('../../utils/create.save.data.to.file');

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

const create = async newUser => {
  try {
    const users = await getAll();
    users.push(newUser);
    await saveUsers(users);

    return true;
  } catch (e) {
    return throwUserRepositoryError(e, 'user was not created');
  }
};

const update = async updatedUser => {
  try {
    const users = (await getAll()).map(cur => (
      cur.id === updatedUser.id ? updatedUser : cur
    ));
    await saveUsers(users);

    return true;
  } catch (e) {
    return throwUserRepositoryError(e, 'user was not updated');
  }
}

const deleteUser = async userId => {
  let users = await getAll();
  try {
    users = users.filter(({ id }) => id !== userId);
    await saveUsers(users);

    return true;
  } catch (e) {
    return throwUserRepositoryError(e, 'user was not deleted');
  }
};

module.exports = { getAll, create, update, getUser, deleteUser };

const path = require('path');

const User = require('./user.model');
const { DATA_PATH } = require('../../common/config');
const createGetDataFromFile = require('../../utils/create.get.data.from.file');
const createSaveDataToFile = require('../../utils/create.save.data.to.file');
const taskRepo = require('../tasks/task.memory.repository');

/**
 * Represents class UserMemoryRepositoryError
 */
class UserMemoryRepositoryError {
  /**
   * Creates an error's object
   * @constructor
   * @param {string} message - The message
   */
  constructor(message = 'unknown error') {
    /** @member {number} */
    this.status = 503;

    /** @member {string} */
    this.message = `User memory repository error: ${message}`;
  }
}

/**
 * Represents file name for users data
 * @type string
 */
const fileName = path.resolve(DATA_PATH, 'users.json');

/**
 * Represents function for reading users data
 * @async
 * @type function
 */
const readUsers = createGetDataFromFile(fileName, UserMemoryRepositoryError);

/**
 * Represents function for writing users data
 * @async
 * @type function
 */
const saveUsers = createSaveDataToFile(fileName);

/**
 * Throws UserMemoryRepositoryError
 * @param {Error} e - The error object
 * @param {string} message - The message
 * @throws UserMemoryRepositoryError
 */
const throwUserRepositoryError = (e, message) => {
  process.stderr.write(e);
  throw new UserMemoryRepositoryError(message);
};

/**
 * Returns all users
 * @async
 * @returns {User[]} - Array of users
 * @throws UserMemoryRepositoryError
 */
const getAll = async () => {
  try {
    return await readUsers();
  } catch (e) {
    return throwUserRepositoryError(e, 'users data is wrong or not available');
  }
};

/**
 * Returns user by id
 * @async
 * @param {string} userId - The user id
 * @returns {User} - The user
 * @throws {Object}
 */
const getUser = async userId => {
  const users = await getAll();
  const user = users.find(({ id }) => id === userId);
  if (!user) {
    throw Object.create({ status: 404, message: 'User not found' });
  }

  return user;
};

/**
 * Creates new user
 * @async
 * @param {string} name - The user name
 * @param {string} login - The user login
 * @param {string} password - The user password
 * @returns {User} - The user
 * @throws {UserMemoryRepositoryError}
 */
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

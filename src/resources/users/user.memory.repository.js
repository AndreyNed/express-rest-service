const path = require('path');

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
 * @exports
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
 * @exports
 * @async
 * @param {string} userId - The user id
 * @returns Promise<User> - The user
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
 * @exports
 * @async
 * @param {User} newUser - the new user object
 * @returns Promise<User> - The Promise resolved as User
 * @throws {UserMemoryRepositoryError}
 */
const create = async newUser => {
  const users = await getAll();
  users.push(newUser);
  try {
    await saveUsers(users);

    return newUser;
  } catch (e) {
    return throwUserRepositoryError(e, 'user was not created');
  }
};

/**
 * Updates user
 * @exports
 * @async
 * @param {User} updatedUser - The updated user
 * @returns Promise<User> - Updated user
 * @throws {UserMemoryRepositoryError}
 */
const update = async updatedUser => {
  try {
    const users = (await getAll()).map(cur => (
      cur.id === updatedUser.id ? updatedUser : cur
    ));
    await saveUsers(users);

    return updatedUser;
  } catch (e) {
    return throwUserRepositoryError(e, 'user was not updated');
  }
}

/**
 * Removes user by user id
 * @exports
 * @async
 * @param {string} userId - The user's id
 * @returns Promise<boolean> - true if user is removed successfully
 * @throws {UserMemoryRepositoryError}
 */
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

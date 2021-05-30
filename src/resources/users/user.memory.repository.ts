const path = require('path');

const { DATA_PATH } = require('../../common/config');
const createGetDataFromFile = require('../../utils/create.get.data.from.file');
const createSaveDataToFile = require('../../utils/create.save.data.to.file');
const { RepositoryError, NotFoundError } = require('../../types/errors');
import IUser from '../../types/user';

/**
 * Represents class UserMemoryRepositoryError
 */
class UserMemoryRepositoryError extends RepositoryError {
  /**
   * Creates an error's object
   * @constructor
   * @param {string} message - The message
   */
  constructor(message = 'unknown error') {
    super();
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
const throwUserRepositoryError = (e:Error, message:string) => {
  process.stderr.write(e.toString());
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
const getUser = async (userId:string):Promise<IUser|null> => {
  const users:IUser[]|[] = await getAll();
  const user:IUser|undefined = users.find(({ id }) => id === userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

/**
 * Creates new user
 * @exports
 * @async
 * @param {User} newUser - the new user object
 * @returns Promise<boolean> - The Promise resolved as success flag
 * @throws {UserMemoryRepositoryError}
 */
const create = async (newUser:IUser):Promise<boolean|void> => {
  try {
    const users:IUser[] = await getAll();
    users.push(newUser);
    await saveUsers(users);

    return true;
  } catch (e) {
    return throwUserRepositoryError(e, 'user was not created');
  }
};

/**
 * Updates user
 * @exports
 * @async
 * @param {User} updatedUser - The updated user
 * @returns Promise<boolean> - Promise resolves to flag of success
 * @throws {UserMemoryRepositoryError}
 */
const update = async (updatedUser:IUser):Promise<boolean|void> => {
  try {
    const users:IUser[] = (await getAll()).map((cur:IUser) => (
      cur.id === updatedUser.id ? updatedUser : cur
    ));
    await saveUsers(users);

    return true;
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
const deleteUser = async (userId:string):Promise<boolean|void> => {
  let users:IUser[] = await getAll();
  try {
    users = users.filter(({ id }) => id !== userId);
    await saveUsers(users);

    return true;
  } catch (e) {
    return throwUserRepositoryError(e, 'user was not deleted');
  }
};

module.exports = { getAll, create, update, getUser, deleteUser };

export {};

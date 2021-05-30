const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const taskRepo = require('../tasks/task.memory.repository');
import IUser from '../../types/user';

/**
 * Gets all users
 * @exports
 * @returns {Promise<User[]>} - array of users
 */
const getAll = ():Promise<IUser[]> => usersRepo.getAll();

/**
 * Creates new user
 * @exports
 * @param {string} name - The user name
 * @param {string} login - The user login
 * @param {string} password - The user password
 * @returns Promise<User> - new User
 */
const create = async ({ name, login, password }:IUser):Promise<IUser> => {
  const newUser:IUser = new User({ name, login, password });
  await usersRepo.create(newUser);

  return newUser;
};

/**
 * Updates user
 * @param {User} user - The user
 * @param {string} name - New user's name
 * @param {string} login - New user's login
 * @param {string} password - New user's password
 * @returns Promise<User> - updated User
 */
const update = async (user:IUser, { name, login, password }:IUser):Promise<IUser> => {
  const updatedUser:IUser = new User({
    ...user,
    ...(name && { name }),
    ...(login && { login }),
    ...(password && { password }),
  });
  await usersRepo.update(updatedUser);

  return updatedUser;
};

/**
 * Gets user by id
 * @param {string} userId - the user's id
 * @returns Promise<User>
 */
const getUser = (userId:string):Promise<IUser> => usersRepo.getUser(userId);

/**
 * Removes user by id
 * @param {string} userId - the user's id
 * @returns Promise<boolean> - represents successful result of operation
 */
const deleteUser = async (userId:string):Promise<boolean> => {
  await usersRepo.deleteUser(userId);
  await taskRepo.clearTaskUserId(userId);

  return true;
};

module.exports = { getAll, create, update, getUser, deleteUser };

export {};

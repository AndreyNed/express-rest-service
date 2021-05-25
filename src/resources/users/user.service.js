const usersRepo = require('./user.memory.repository');

/**
 * Gets all users
 * @returns {User[]} - array of users
 */
const getAll = () => usersRepo.getAll();

/**
 * Creates new user
 * @param {User} payload - data for new user
 * @returns Promise<User> - new User
 */
const create = payload => usersRepo.create(payload);

/**
 * Updates user
 * @param {User} user - the existed user data
 * @param {User} payload - the new user's data to change
 * @returns Promise<User> - updated User
 */
const update = (user, payload) => usersRepo.update(user, payload);

/**
 * Gets user by id
 * @param {string} userId - the user's id
 * @returns Promise<User>
 */
const getUser = userId => usersRepo.getUser(userId);

/**
 * Removes user by id
 * @param {string} userId - the user's id
 * @returns Promise<boolean> - represents successful result of operation
 */
const deleteUser = userId => usersRepo.deleteUser(userId);

module.exports = { getAll, create, update, getUser, deleteUser };

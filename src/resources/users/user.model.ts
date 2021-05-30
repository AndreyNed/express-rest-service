const { v4: uuidV4 } = require('uuid');

import IUser from '../../types/user';

/**
 * Represents type User
 * @typedef {Object} User
 * @property {string} [id] - The user id
 * @property {string} name - The user name
 * @property {string} login - The user login
 * @property {string} [password] - The user password
 */

/**
 * Represents class User
 * @class
 */
class User implements IUser {
  id: string;
  name: string;
  login: string;
  password: string;
  
  /**
   * Creates user
   * @constructor
   * @param {string} id - The user id
   * @param {string} name - The user name
   * @param {string} login - The user login
   * @param {string} password - The user password
   */
  constructor({
    id = uuidV4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    /** @member {string} */
    this.id = id;

    /** @member {string} */
    this.name = name;

    /** @member {string} */
    this.login = login;

    /** @member {string} */
    this.password = password;
  }

  /**
   * Returns user object without password
   * @static
   * @param {User} user - The user
   * @returns {User} - User's data without a password
   */
  static toResponse(user:User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;

export {};

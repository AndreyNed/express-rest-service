import { v4 as uuidV4 } from 'uuid';

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
   * @param {Partial<IUser>} props - The properties values
   */
  constructor(props: Partial<IUser> = {}) {
    /** @member {string} */
    this.id = props.id || uuidV4();

    /** @member {string} */
    this.name = props.name || 'USER';

    /** @member {string} */
    this.login = props.login || 'user';

    /** @member {string} */
    this.password = props.password || 'P@55w0rd';
  }

  /**
   * Returns user object without password
   * @static
   * @param {User} user - The user
   * @returns {User} - User's data without a password
   */
  static toResponse(user: IUser): Partial<IUser> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;

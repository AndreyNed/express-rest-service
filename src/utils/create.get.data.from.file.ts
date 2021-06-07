import * as fs from 'fs';

import { ICustomizedErrorConstructor } from '../types/errors';

/**
 * Creates async function which reads from file with given file name
 * @param {string} fileName - The file name
 * @param {function} RepoError - The constructor or class of error object
 * @param {boolean} isArray - The flag which reflects whether data should be an array or not
 * @returns {function} Async function which reads from `fileName`
 */
const createGetDataFromFile = (
  fileName: string,
  RepoError: ICustomizedErrorConstructor,
  isArray = true
) =>
  /**
   * Reads data from file with given file name
   * @async
   * @returns {Promise} - Promise which resolves to data from file or
   * rejected to repository error object
   */
  async <T>(): Promise<T> => {
    const jsonData: string = fs.readFileSync(fileName, 'utf-8');
    const data: T = JSON.parse(jsonData);
    if (isArray && !Array.isArray(data)) {
      throw new RepoError('data should be an array');
    }

    return data;
  };

export default createGetDataFromFile;

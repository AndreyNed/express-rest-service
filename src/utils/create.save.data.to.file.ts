import * as fs from 'fs';

/**
 * Creates a function which writes data into file with given file name
 * @param {string} filename - The file name
 * @returns {function} - Async function
 */
const createSaveDataToFile = (filename: string) =>
  /**
   * Writes data to file with given file name
   * @async
   * @param {Object} data - The payload with data object
   * @returns {void}
   */
  async <T>(data: T): Promise<void> => {
    const jsonData: string = JSON.stringify(data);

    await fs.writeFileSync(filename, jsonData, 'utf-8');
  };

export default createSaveDataToFile;

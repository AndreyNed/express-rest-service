const fs = require('fs');

/**
 * Creates a function which writes data into file with given file name
 * @param {string} filename - The file name
 * @returns {function} - Async function
 */
const createSaveDataToFile = (filename:string) => (
  /**
   * Writes data to file with given file name
   * @async
   * @param {Object} data - The payload with data object
   * @returns {void}
   */
  async (data:Record<string, unknown>|Array<Record<string, unknown>>|[]):Promise<void> => {
    const jsonData:string = JSON.stringify(data);

    await fs.writeFileSync(filename, jsonData, 'utf-8');
  }
);

module.exports = createSaveDataToFile;

export {};

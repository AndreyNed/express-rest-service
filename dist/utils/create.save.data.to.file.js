"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
/**
 * Creates a function which writes data into file with given file name
 * @param {string} filename - The file name
 * @returns {function} - Async function
 */
const createSaveDataToFile = filename => (
/**
 * Writes data to file with given file name
 * @async
 * @param {Object} data - The payload with data object
 * @returns {void}
 */
async (data) => {
    const jsonData = JSON.stringify(data);
    await fs.writeFileSync(filename, jsonData, 'utf-8');
});
module.exports = createSaveDataToFile;

const fs = require('fs').promises;

const createSaveDataToFile = filename => async data => {
  const jsonData = JSON.stringify(data);

  await fs.writeFile(filename, jsonData, 'utf-8');
};

module.exports = createSaveDataToFile;

const fs = require('fs');

const createSaveDataToFile = filename => async data => {
  const jsonData = JSON.stringify(data);

  await fs.writeFileSync(filename, jsonData, 'utf-8');
};

module.exports = createSaveDataToFile;

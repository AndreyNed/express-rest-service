const fs = require('fs').promises;

const createGetDataFromFile = (fileName, RepositoryError, isArray = true) => async () => {
  const jsonData = await fs.readFile(fileName, 'utf-8');
  const data = JSON.parse(jsonData);
  if (isArray && !Array.isArray(data)) {
    throw new RepositoryError('data should be an array');
  }

  return data;
};

module.exports = createGetDataFromFile;

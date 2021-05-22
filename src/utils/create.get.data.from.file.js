const fs = require('fs');

const createGetDataFromFile = (fileName, RepositoryError, isArray = true) => async () => {
  const jsonData = fs.readFileSync(fileName, 'utf-8');
  const data = JSON.parse(jsonData);
  if (isArray && !Array.isArray(data)) {
    throw new RepositoryError('data should be an array');
  }

  return data;
};

module.exports = createGetDataFromFile;

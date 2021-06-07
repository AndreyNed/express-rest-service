import * as path from 'path';

const getFullFileName = (fileName: string) =>
  path.resolve(__dirname, '..', 'data', fileName);

const ENTITIES = {
  USERS: {
    name: 'user',
    fileName: getFullFileName('users.json'),
  },
  BOARDS: {
    name: 'boards',
    fileName: getFullFileName('boards.json'),
  },
  TASKS: {
    name: 'tasks',
    fileName: getFullFileName('tasks.json'),
  },
};

module.exports = ENTITIES;

export {};

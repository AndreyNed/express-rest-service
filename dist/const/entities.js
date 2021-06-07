const path = require('path');
const getFullFileName = (fileName) => path.resolve(__dirname, '..', 'data', fileName);
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

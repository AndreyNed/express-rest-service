const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();

module.exports = { getAll };

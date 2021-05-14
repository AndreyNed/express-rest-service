const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();

const getBoard = boardId => boardRepo.getBoard(boardId);

const create = ({ title, columns }) => boardRepo.create({ title, columns });

const update = ({ id, title, columns }) => boardRepo.update({ id, title, columns });

const deleteBoard = boardId => boardRepo.deleteBoard(boardId);

module.exports = { getAll, getBoard, create, update, deleteBoard };

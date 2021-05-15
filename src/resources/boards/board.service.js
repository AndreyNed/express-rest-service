const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();

const getBoard = boardId => boardRepo.getBoard(boardId);

const create = payload => boardRepo.create(payload);

const update = (board, payload) => boardRepo.update(board, payload);

const deleteBoard = boardId => boardRepo.deleteBoard(boardId);

module.exports = { getAll, getBoard, create, update, deleteBoard };

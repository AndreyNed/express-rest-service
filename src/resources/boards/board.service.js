const boardRepo = require('./board.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');
const Board = require('./board.model');

const getAll = () => boardRepo.getAll();

const getBoard = boardId => boardRepo.getBoard(boardId);

const create = async ({ title, columns }) => {
  const newBoard = new Board({ title, columns });
  await boardRepo.create(newBoard);

  return newBoard;
};

const update = async (board, { title, columns }) => {
  const updatedBoard = new Board({
    ...board,
    ...(title && { title }),
    ...(columns && { columns }),
  });

  await boardRepo.update(updatedBoard);
  await taskRepo.clearColumnIdByBoard(updatedBoard);

  return updatedBoard;
};

const deleteBoard = async boardId => {
  await boardRepo.deleteBoard(boardId);
  await taskRepo.deleteTasksByBoardId(boardId);

  return true;
};

module.exports = { getAll, getBoard, create, update, deleteBoard };

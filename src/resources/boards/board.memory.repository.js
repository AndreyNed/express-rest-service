const path = require('path');

const Board = require('./board.model');
const { DATA_PATH } = require('../../common/config');
const createGetDataFromFile = require('../../utils/create.get.data.from.file');
const createSaveDataToFile = require('../../utils/create.save.data.to.file');
const taskRepo = require('../tasks/task.memory.repository');

class BoardMemoryRepositoryError {
  constructor(message = 'unknown error') {
    this.status = 503;
    this.message = `Board memory repository error: ${message}`;
  }
}

const fileName = path.resolve(DATA_PATH, 'boards.json');
const readBoards = createGetDataFromFile(fileName, BoardMemoryRepositoryError);
const saveBoards = createSaveDataToFile(fileName);

const throwBoardRepositoryError = (e, message) => {
  process.stderr.write(e);
  throw new BoardMemoryRepositoryError(message);
};

const getAll = async () => {
  try {
    return await readBoards();
  } catch (e) {
    return throwBoardRepositoryError(e, 'boards data is wrong or not available');
  }
};

const getBoard = async boardId => {
  const boards = await getAll();
  const board = boards.find(({ id }) => id === boardId);
  if (!board) {
    throw Object.create({ status: 404, message: 'Board not found' });
  }

  return board;
};

const create = async ({ title, columns }) => {
  const boards = await getAll();
  const newBoard = new Board({ title, columns });
  boards.push(newBoard);
  try {
    await saveBoards(boards);

    return newBoard;
  } catch (e) {
    return throwBoardRepositoryError(e, 'board was not created');
  }
};

const update = async (board, { title, columns }) => {
  const updated = new Board({
    ...board,
    ...(title && { title }),
    ...(columns && { columns }),
  });
  try {
    const boards = (await getAll()).map(cur => (
      cur.id === board.id ? updated : cur
    ));
    await saveBoards(boards);
    await taskRepo.clearColumnIdByBoard(updated);

    return updated;
  } catch (e) {
    return throwBoardRepositoryError(e, 'board was not updated');
  }
}

const deleteBoard = async boardId => {
  let boards = await getAll();
  try {
    boards = boards.filter(({ id }) => id !== boardId);
    await saveBoards(boards);
    await taskRepo.deleteTasksByBoardId(boardId);

    return true;
  } catch (e) {
    return throwBoardRepositoryError(e, 'board was not deleted');
  }
};

module.exports = { getAll, getBoard, create, update, deleteBoard };

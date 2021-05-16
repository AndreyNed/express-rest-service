const path = require('path');

const Board = require('./board.model');
const { DATA_PATH } = require('../../common/config');
const createGetDataFromFile = require('../../utils/create.get.data.from.file');
const createSaveDataToFile = require('../../utils/create.save.data.to.file');

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
  // eslint-disable-next-line no-console
  console.error(e);
  throw new BoardMemoryRepositoryError(message);
};

// eslint-disable-next-line consistent-return
const getAll = async () => {
  try {
    return await readBoards();
  } catch (e) {
    throwBoardRepositoryError(e, 'boards data is wrong or not available');
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

// eslint-disable-next-line consistent-return
const create = async ({ title, columns }) => {
  const boards = await getAll();
  const newBoard = new Board({ title, columns });
  boards.push(newBoard);
  try {
    await saveBoards(boards);

    return newBoard;
  } catch (e) {
    throwBoardRepositoryError(e, 'board was not created');
  }
};

// eslint-disable-next-line consistent-return
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

    return updated;
  } catch (e) {
    throwBoardRepositoryError(e, 'board was not updated');
  }
}

// eslint-disable-next-line consistent-return
const deleteBoard = async boardId => {
  let boards = await getAll();
  try {
    boards = boards.filter(({ id }) => id !== boardId);
    await saveBoards(boards);

    return true;
  } catch (e) {
    throwBoardRepositoryError(e, 'board was not deleted');
  }
};

module.exports = { getAll, getBoard, create, update, deleteBoard };

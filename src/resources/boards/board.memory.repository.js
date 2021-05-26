const path = require('path');

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

const create = async newBoard => {
  const boards = await getAll();
  boards.push(newBoard);
  try {
    await saveBoards(boards);

    return true;
  } catch (e) {
    return throwBoardRepositoryError(e, 'board was not created');
  }
};

const update = async updatedBoard => {
  try {
    const boards = (await getAll()).map(cur => (
      cur.id === updatedBoard.id ? updatedBoard : cur
    ));
    await saveBoards(boards);

    return true;
  } catch (e) {
    return throwBoardRepositoryError(e, 'board was not updated');
  }
}

const deleteBoard = async boardId => {
  let boards = await getAll();
  try {
    boards = boards.filter(({ id }) => id !== boardId);
    await saveBoards(boards);

    return true;
  } catch (e) {
    return throwBoardRepositoryError(e, 'board was not deleted');
  }
};

module.exports = { getAll, getBoard, create, update, deleteBoard };

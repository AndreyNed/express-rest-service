import IBoard from '../../types/board';

const path = require('path');

const { DATA_PATH } = require('../../common/config');
const createGetDataFromFile = require('../../utils/create.get.data.from.file');
const createSaveDataToFile = require('../../utils/create.save.data.to.file');
const { RepositoryError, NotFoundError } = require('../../types/errors');

/**
 * Represents board repository error
 * @class
 */
class BoardMemoryRepositoryError extends RepositoryError {
  /**
   * Creates a board repository error object
   * @constructor
   * @param {string} message - The message
   */
  constructor(message = 'unknown error') {
    super();
    /** @member {number} */
    this.status = 503;

    /** @member {string} */
    this.message = `Board memory repository error: ${message}`;
  }
}

const fileName:string = path.resolve(DATA_PATH, 'boards.json');
const readBoards = createGetDataFromFile(fileName, BoardMemoryRepositoryError);
const saveBoards = createSaveDataToFile(fileName);

/**
 * Throws board repository error with log
 * @param {Error} e - The error object
 * @param {string} message - The provided error message
 * @throws {BoardMemoryRepositoryError}
 */
const throwBoardRepositoryError = (e:Error, message:string) => {
  process.stderr.write(e.toString());
  throw new BoardMemoryRepositoryError(message);
};

/**
 * Selects all boards
 * @exports
 * @async
 * @returns {Board[]|[]|void}
 * @throws {BoardMemoryRepositoryError}
 */
const getAll = async ():Promise<IBoard[]> => {
  try {
    return await readBoards();
  } catch (e) {
    return throwBoardRepositoryError(e, 'boards data is wrong or not available');
  }
};

/**
 * Selects board by id
 * @exports
 * @async
 * @param {string} boardId - The board id
 * @returns {Promise<Board|null|void>}
 * @throws {Object}
 */
const getBoard = async (boardId:string):Promise<IBoard> => {
  const boards:IBoard[] = await getAll();
  const board:IBoard|undefined = boards.find(({ id }:IBoard):boolean => id === boardId);
  if (!board) {
    throw new NotFoundError('Board not found');
  }

  return board;
};

/**
 * Creates new board
 * @exports
 * @async
 * @param {Board} newBoard - The new board
 * @returns {Promise<boolean|void>} - The successful flag
 * @throws {BoardMemoryRepositoryError}
 */
const create = async (newBoard:IBoard):Promise<boolean> => {
  const boards:IBoard[] = await getAll();
  boards.push(newBoard);
  try {
    await saveBoards(boards);

    return true;
  } catch (e) {
    return throwBoardRepositoryError(e, 'board was not created');
  }
};

/**
 * Updates board with provided changes
 * @exports
 * @async
 * @param {Board} updatedBoard - The updated board
 * @returns {Promise<boolean|void>} - The flag of successful operation
 * @throws {BoardMemoryRepositoryError}
 */
const update = async (updatedBoard:IBoard):Promise<boolean> => {
  try {
    const boards:IBoard[] = (await getAll()).map((cur:IBoard):IBoard => (
      cur.id === updatedBoard.id ? updatedBoard : cur
    ));
    await saveBoards(boards);

    return true;
  } catch (e) {
    return throwBoardRepositoryError(e, 'board was not updated');
  }
}

/**
 * Removes board by id
 * @exports
 * @async
 * @param {string} boardId - The board id
 * @returns {Promise<boolean|void>}
 */
const deleteBoard = async (boardId:string):Promise<boolean> => {
  let boards:IBoard[] = await getAll();
  try {
    boards = boards.filter(({ id }) => id !== boardId);
    await saveBoards(boards);

    return true;
  } catch (e) {
    return throwBoardRepositoryError(e, 'board was not deleted');
  }
};

module.exports = { getAll, getBoard, create, update, deleteBoard };

export {};

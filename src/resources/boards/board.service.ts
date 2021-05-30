import IBoard from '../../types/board';

const boardRepo = require('./board.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');
const Board = require('./board.model');

/**
 * Gets all boards
 * @exports
 * @returns {Board[]|[]} - list of boards
 */
const getAll = ():Promise<IBoard[]> => boardRepo.getAll();

/**
 * Gets board by id
 * @param {string} boardId - The board id
 * @return {Promise<Board|null>}
 */
const getBoard = (boardId:string):Promise<IBoard> => boardRepo.getBoard(boardId);

/**
 * Creates new board
 * @exports
 * @param {string} title - The board title
 * @param {IBoardColumn[]} columns - The board columns
 * @returns {Board} - new board
 */
const create = async ({ title, columns }:IBoard):Promise<IBoard> => {
  const newBoard:IBoard = new Board({ title, columns });
  await boardRepo.create(newBoard);

  return newBoard;
};

/**
 * Updates board with provided data
 * Clear columns id in tasks
 * @exports
 * @async
 * @param {Board} board - The current board
 * @param {string} title - The new title
 * @param {IBoardColumn[]} columns - The new columns
 */
const update = async (board:IBoard, { title, columns }:IBoard):Promise<IBoard> => {
  const updatedBoard:IBoard = new Board({
    ...board,
    ...(title && { title }),
    ...(columns && { columns }),
  });

  await boardRepo.update(updatedBoard);
  await taskRepo.clearColumnIdByBoard(updatedBoard);

  return updatedBoard;
};

/**
 * Removes board by id
 * @exports
 * @param {string} boardId - The board id
 * @returns {boolean} - The flag of successful operation
 */
const deleteBoard = async (boardId:string):Promise<boolean> => {
  await boardRepo.deleteBoard(boardId);
  await taskRepo.deleteTasksByBoardId(boardId);

  return true;
};

module.exports = { getAll, getBoard, create, update, deleteBoard };

export {};

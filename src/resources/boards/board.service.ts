import IBoard from '../../types/board';

import boardRepo from './board.memory.repository';
import taskRepo from '../tasks/task.memory.repository';
import Board from './board.model';

/**
 * Gets all boards
 * @exports
 * @returns {Board[]|[]} - list of boards
 */
const getAll = (): Promise<IBoard[]> => boardRepo.getAll();

/**
 * Gets board by id
 * @param {string} boardId - The board id
 * @return {Promise<Board|null>}
 */
const getBoard = (boardId: string): Promise<IBoard> =>
  boardRepo.getBoard(boardId);

/**
 * Creates new board
 * @exports
 * @param {Partial<IBoard>} data - New board's data
 * @returns {IBoard} - new board
 */
const create = async (data: Partial<IBoard>): Promise<IBoard> => {
  const newBoard: IBoard = new Board(data);
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
const update = async (
  board: IBoard,
  { title, columns }: Partial<IBoard>
): Promise<IBoard> => {
  const updatedBoard: IBoard = new Board({
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
const deleteBoard = async (boardId: string): Promise<boolean> => {
  await boardRepo.deleteBoard(boardId);
  await taskRepo.deleteTasksByBoardId(boardId);

  return true;
};

export default { getAll, getBoard, create, update, deleteBoard };

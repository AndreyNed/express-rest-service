import boardRepo from './board.memory.repository';
import taskRepo from '../tasks/task.memory.repository';
import Board from './board.model';
/**
 * Gets all boards
 * @exports
 * @returns {Board[]|[]} - list of boards
 */
const getAll = () => boardRepo.getAll();
/**
 * Gets board by id
 * @param {string} boardId - The board id
 * @return {Promise<Board|null>}
 */
const getBoard = (boardId) => boardRepo.getBoard(boardId);
/**
 * Creates new board
 * @exports
 * @param {string} title - The board title
 * @param {IBoardColumn[]} columns - The board columns
 * @returns {Board} - new board
 */
const create = async ({ title, columns }) => {
    const newBoard = new Board({ title, columns });
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
/**
 * Removes board by id
 * @exports
 * @param {string} boardId - The board id
 * @returns {boolean} - The flag of successful operation
 */
const deleteBoard = async (boardId) => {
    await boardRepo.deleteBoard(boardId);
    await taskRepo.deleteTasksByBoardId(boardId);
    return true;
};
export default { getAll, getBoard, create, update, deleteBoard };

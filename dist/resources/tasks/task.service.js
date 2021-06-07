const taskRepo = require('./task.memory.repository');
const Task = require('./task.model');
/**
 * Gets tasks by board id
 * @exports
 * @param {string} boardId - The board id
 * @returns {Promise<Task[]|[]|void>} - list of tasks for board
 */
const getByBoardId = (boardId) => taskRepo.getByBoardId(boardId);
/**
 * Creates and returns new task
 * @exports
 * @async
 * @param {string} title - The task title
 * @param {number} order - The task order
 * @param {string} description - The task description
 * @param {string} userId - The task userId
 * @param {string} boardId - The task boardId
 * @param {string} columnId - The task columnId
 * @returns {Promise<Task>} - created task
 */
const create = async ({ title, order, description, userId, boardId, columnId, }) => {
    const newTask = new Task({
        title,
        order,
        description,
        userId,
        boardId,
        columnId,
    });
    await taskRepo.create(newTask);
    return newTask;
};
/**
 * Gets task by id and board id
 * @exports
 * @param {string} taskId - The task id
 * @param {string} boardId - The board id
 * @returns {Promise<Task>} - task
 */
const getTask = (taskId, boardId) => taskRepo.getTask(taskId, boardId);
/**
 * Updates task with provided data
 * @exports
 * @async
 * @param {Task} task - the current task
 * @param {string} title - the task title
 * @param {number} order - the task order
 * @param {string} description - the task description
 * @param {string} userId - the task userId
 * @param {string} boardId - the task boardId
 * @param {string} columnId - the task columnId
 * @returns {Promise<Task>} - updated task
 */
const update = async (task, { title, order, description, userId, boardId, columnId, }) => {
    const updatedTask = new Task({
        ...task,
        ...(title && { title }),
        ...(order && { order }),
        ...(description && { description }),
        ...(userId !== undefined && { userId }),
        ...(boardId !== undefined && { boardId }),
        ...(columnId !== undefined && { columnId }),
    });
    await taskRepo.update(updatedTask);
    return updatedTask;
};
/**
 * Removes task by id
 * @exports
 * @param {string} taskId - the task id
 * @return {Promise<boolean>} - the flag of success
 */
const deleteTask = (taskId) => taskRepo.deleteTask(taskId);
module.exports = { getByBoardId, create, getTask, update, deleteTask };
export {};

import ITask from '../../types/task';
import taskRepo from './task.memory.repository';
import Task from './task.model';

/**
 * Gets tasks by board id
 * @exports
 * @param {string} boardId - The board id
 * @returns {Promise<Task[]|[]|void>} - list of tasks for board
 */
const getByBoardId = (boardId: string): Promise<ITask[]> =>
  taskRepo.getByBoardId(boardId);

/**
 * Creates and returns new task
 * @exports
 * @async
 * @param {ITask} data - The task title
 * @returns {Promise<Task>} - created task
 */
const create = async (data: Partial<ITask>): Promise<ITask> => {
  const newTask: ITask = new Task(data);
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
const getTask = (taskId: string, boardId: string): Promise<ITask> =>
  taskRepo.getTask(taskId, boardId);

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
const update = async (
  task: ITask,
  { title, order, description, userId, boardId, columnId }: ITask
): Promise<ITask> => {
  const updatedTask: ITask = new Task({
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
const deleteTask = (taskId: string): Promise<boolean> =>
  taskRepo.deleteTask(taskId);

export default { getByBoardId, create, getTask, update, deleteTask };

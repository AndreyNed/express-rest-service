import ITask from '../../types/task';

import IBoard from '../../types/board';
import IBoardColumn from '../../types/board-column';

const path = require('path');

const { DATA_PATH } = require('../../common/config');
const createGetDataFromFile = require('../../utils/create.get.data.from.file');
const createSaveDataToFile = require('../../utils/create.save.data.to.file');
const { RepositoryError, NotFoundError } = require('../../types/errors');

/**
 * Represents task memory repository error
 * @class
 */
class TaskMemoryRepositoryError extends RepositoryError {
  /**
   * Creates task memory repository error
   * @constructor
   * @param {string} message - the message
   */
  constructor(message = 'unknown error') {
    super();
    /**  @member {number} */
    this.status = 503;

    /** @member {string} */
    this.message = `Task memory repository error: ${message}`;
  }
}

const fileName = path.resolve(DATA_PATH, 'tasks.json');
const readTasks = createGetDataFromFile(fileName, TaskMemoryRepositoryError);
const saveTasks = createSaveDataToFile(fileName);

/**
 * Throws task memory repository error
 * @param {Error} e - the error object
 * @param {string} message - the message
 * @throws {TaskMemoryRepositoryError}
 */
const throwTaskRepositoryError = (e:Error, message:string) => {
  process.stderr.write(e.toString());
  throw new TaskMemoryRepositoryError(message);
};

/**
 * Selects all tasks
 * @async
 * @returns {Promise<Task[]|[]|void>} - list of all tasks
 * @throws {TaskMemoryRepositoryError}
 */
const getAll = async ():Promise<ITask[]> => {
  try {
    return await readTasks();
  } catch (e) {
    return throwTaskRepositoryError(e, 'tasks data is wrong or not available');
  }
};

/**
 * Selects tasks by board id
 * @exports
 * @async
 * @param {string} boardId - The board id
 * @returns {Promise<Task[]|[]|void>} - list of tasks for board
 */
const getByBoardId = async (boardId:string):Promise<ITask[]> => {
  const tasks:ITask[] = await getAll();

  return tasks.filter((task:ITask):boolean => task.boardId === boardId)
};

/**
 * Returns task by id and board id
 * @exports
 * @async
 * @param {string} taskId - the task id
 * @param {string} boardId - the board id
 * @returns {Promise<Task>}
 */
const getTask = async (taskId:string, boardId:string):Promise<ITask> => {
  /** @type {Task[]} */
  const tasks:ITask[] = await getByBoardId(boardId);

  const task:ITask|undefined = tasks.find((item:ITask):boolean => item.id === taskId);

  if (!task) {
    throw new NotFoundError('Task not found');
  }

  return task;
};

/**
 * Creates new task
 * @exports
 * @async
 * @param {Task} newTask - the new task
 * @returns {Promise<boolean|void>} - flag of success
 * @throws {TaskMemoryRepositoryError}
 */
const create = async (newTask:ITask):Promise<boolean> => {
  try {
    const tasks:ITask[] = await getAll();
    tasks.push(newTask);
    await saveTasks(tasks);

    return true;
  } catch (e) {
    return throwTaskRepositoryError(e, 'task was not created');
  }
};

/**
 * Updates tasks
 * @exports
 * @async
 * @param {Task} updatedTask - The updated task
 * @returns {Promise<boolean|void>} - the flag of success
 * @throws {TaskMemoryRepositoryError}
 */
const update = async (updatedTask:ITask):Promise<boolean> => {
  try {
    const tasks:ITask[] = (await getAll()).map((cur:ITask):ITask => (
      cur.id === updatedTask.id ? updatedTask : cur
    ));
    await saveTasks(tasks);

    return true;
  } catch (e) {
    return throwTaskRepositoryError(e, 'task was not updated');
  }
}

/**
 * Clears columnId field according to existing columns by board
 * @exports
 * @async
 * @param {Board} board
 */
const clearColumnIdByBoard = async (board:IBoard):Promise<void> => {
  const { id: boardId, columns } = board;
  const idList = columns.map(({ id: columnId }:IBoardColumn):string|undefined => columnId);
  let shouldUpdate = false;
  const tasks:ITask[] = (await getAll()).map((task:ITask):ITask => {
    const { boardId: taskBoardId } = task;
    let { columnId } = task;
    if (taskBoardId === boardId && !(columnId && idList.includes(columnId))) {
      columnId = null;
      shouldUpdate = true;
    }

    return {
      ...task,
      columnId,
    };
  });

  if (shouldUpdate) {
    try {
      await saveTasks(tasks);
    } catch(e) {
      throwTaskRepositoryError(e, 'tasks were not updated')
    }
  }
};

/**
 * Clears userId field in tasks
 * @exports
 * @async
 * @param {string} userId - the user id
 */
const clearTaskUserId = async (userId:string):Promise<void> => {
  let shouldUpdate = false;
  const clear = ():null => {
    shouldUpdate = true;
    return null;
  };
  const tasks:ITask[] = (await getAll()).map((task:ITask):ITask => ({
    ...task,
    userId: task.userId === userId ? clear() : task.userId,
  }));
  if (shouldUpdate) {
    try {
      await saveTasks(tasks);
    } catch (e) {
      throwTaskRepositoryError(e, 'tasks were not updated');
    }
  }
};

/**
 * Removes task by id
 * @exports
 * @async
 * @param {string} taskId - the task id
 * @returns {Promise<boolean|void>} - the flag of success
 * @throws {TaskMemoryRepositoryError}
 */
const deleteTask = async (taskId:string):Promise<boolean> => {
  try {
    let tasks:ITask[] = await getAll();
    tasks = tasks.filter((task:ITask):boolean => task.id !== taskId);
    await saveTasks(tasks);

    return true;
  } catch (e) {
    return throwTaskRepositoryError(e, 'task was not deleted');
  }
};

/**
 * Removes tasks by board id (when board was deleted)
 * @exports
 * @async
 * @param {string} boardId - the board id
 */
const deleteTasksByBoardId = async (boardId:string):Promise<void> => {
  const tasks:ITask[] = (await getAll()).filter(
    (task:ITask):boolean => task.boardId !== boardId
  );
  try {
    await saveTasks(tasks);
  } catch (e) {
    throwTaskRepositoryError(e, 'tasks were not deleted');
  }
};

module.exports = {
  getByBoardId,
  create,
  getTask,
  update,
  deleteTask,
  clearColumnIdByBoard,
  deleteTasksByBoardId,
  clearTaskUserId,
};

export {};

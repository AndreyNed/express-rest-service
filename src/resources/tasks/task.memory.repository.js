const path = require('path');

const { DATA_PATH } = require('../../common/config');
const createGetDataFromFile = require('../../utils/create.get.data.from.file');
const createSaveDataToFile = require('../../utils/create.save.data.to.file');

/**
 * Represents task memory repository error
 * @class
 */
class TaskMemoryRepositoryError {
  /**
   * Creates task memory repository error
   * @constructor
   * @param {string} message - the message
   */
  constructor(message = 'unknown error') {
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
const throwTaskRepositoryError = (e, message) => {
  process.stderr.write(e);
  throw new TaskMemoryRepositoryError(message);
};

/**
 * Selects all tasks
 * @async
 * @returns {Promise<Task[]|[]|void>} - list of all tasks
 * @throws {TaskMemoryRepositoryError}
 */
const getAll = async () => {
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
const getByBoardId = async boardId => {
  const tasks = await getAll();

  return tasks.filter(task => task.boardId === boardId)
};

/**
 * Returns task by id and board id
 * @exports
 * @async
 * @param {string} taskId - the task id
 * @param {string} boardId - the board id
 * @returns {Promise<Task>}
 */
const getTask = async (taskId, boardId) => {
  /** @type {Task[]} */
  const tasks = await getByBoardId(boardId);

  const task = tasks.find(item => item.id === taskId);

  if (!task) {
    throw Object.create({ status: 404, message: 'Task not found' });
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
const create = async newTask => {
  try {
    const tasks = await getAll();
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
const update = async updatedTask => {
  try {
    const tasks = (await getAll()).map(cur => (
      cur.id === updatedTask.id ? updatedTask : cur
    ));
    await saveTasks(tasks);

    return true;
  } catch (e) {
    return throwTaskRepositoryError(e, 'task was not updated');
  }
}

const clearColumnIdByBoard = async board => {
  const { id: boardId, columns } = board;
  const idList = columns.map(({ id: columnId }) => columnId);
  let shouldUpdate = false;
  const tasks = (await getAll()).map(task => {
    const { boardId: taskBoardId } = task;
    let { columnId } = task;
    if (taskBoardId === boardId && !idList.includes(columnId)) {
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

const clearTaskUserId = async userId => {
  let shouldUpdate = false;
  const clear = () => {
    shouldUpdate = true;
    return null;
  };
  const tasks = (await getAll()).map(task => ({
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
const deleteTask = async taskId => {
  try {
    let tasks = await getAll();
    tasks = tasks.filter(task => task.id !== taskId);
    await saveTasks(tasks);

    return true;
  } catch (e) {
    return throwTaskRepositoryError(e, 'task was not deleted');
  }
};

const deleteTasksByBoardId = async boardId => {
  const tasks = (await getAll()).filter(
    ({ boardId: taskBoardId }) => taskBoardId !== boardId
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

const path = require('path');

const Task = require('./task.model');
const { DATA_PATH } = require('../../common/config');
const createGetDataFromFile = require('../../utils/create.get.data.from.file');
const createSaveDataToFile = require('../../utils/create.save.data.to.file');

class TaskMemoryRepositoryError {
  constructor(message = 'unknown error') {
    this.status = 503;
    this.message = `Task memory repository error: ${message}`;
  }
}

const fileName = path.resolve(DATA_PATH, 'tasks.json');
const readTasks = createGetDataFromFile(fileName, TaskMemoryRepositoryError);
const saveTasks = createSaveDataToFile(fileName);

const throwTaskRepositoryError = (e, message) => {
  // eslint-disable-next-line no-console
  console.error(e);
  throw new TaskMemoryRepositoryError(message);
};

// eslint-disable-next-line consistent-return
const getAll = async () => {
  try {
    return await readTasks();
  } catch (e) {
    throwTaskRepositoryError(e, 'tasks data is wrong or not available');
  }
};

const getByBoardId = async boardId => (
  (await getAll()).filter(({ boardId: taskBoardId }) => taskBoardId === boardId)
);

const getTask = async (taskId, boardId) => {
  const tasks = await getByBoardId(boardId);
  const task = tasks.find(({ id }) => id === taskId);
  if (!task) {
    throw Object.create({ status: 404, message: 'Task not found' });
  }

  return task;
};

const create = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
  // eslint-disable-next-line consistent-return
}) => {
  const tasks = await getAll();
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  tasks.push(newTask);
  try {
    await saveTasks(tasks);

    return newTask;
  } catch (e) {
    throwTaskRepositoryError(e, 'task was not created');
  }
};

const update = async (task, {
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
  // eslint-disable-next-line consistent-return
}) => {
  const updated = new Task({
    ...task,
    ...(title && { title }),
    ...(order && { order }),
    ...(description && { description }),
    ...(userId && { userId }),
    ...(boardId && { boardId }),
    ...(columnId && { columnId }),
  });
  try {
    const tasks = (await getAll()).map(cur => (
      cur.id === task.id ? updated : cur
    ));
    await saveTasks(tasks);

    return updated;
  } catch (e) {
    throwTaskRepositoryError(e, 'task was not updated');
  }
}

// eslint-disable-next-line consistent-return
const deleteTask = async taskId => {
  let tasks = await getAll();
  try {
    tasks = tasks.filter(({ id }) => id !== taskId);
    await saveTasks(tasks);

    return true;
  } catch (e) {
    throwTaskRepositoryError(e, 'task was not deleted');
  }
};

module.exports = { getByBoardId, create, getTask, update, deleteTask };

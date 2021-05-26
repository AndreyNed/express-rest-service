const path = require('path');

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
  process.stderr.write(e);
  throw new TaskMemoryRepositoryError(message);
};

const getAll = async () => {
  try {
    return await readTasks();
  } catch (e) {
    return throwTaskRepositoryError(e, 'tasks data is wrong or not available');
  }
};

const getByBoardId = async boardId => {
  const tasks = await getAll();

  return tasks.filter(task => task.boardId === boardId)
};

const getTask = async (taskId, boardId) => {
  const tasks = await getByBoardId(boardId);

  const task = tasks.find(item => item.id === taskId);

  if (!task) {
    throw Object.create({ status: 404, message: 'Task not found' });
  }

  return task;
};

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
    task => task.boardId !== boardId
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

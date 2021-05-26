const taskRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getByBoardId = boardId => taskRepo.getByBoardId(boardId);

const create = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => {
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

const getTask = (taskId, boardId) => taskRepo.getTask(taskId, boardId);

const update = async (task, {
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => {
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

const deleteTask = taskId => taskRepo.deleteTask(taskId);

module.exports = { getByBoardId, create, getTask, update, deleteTask };

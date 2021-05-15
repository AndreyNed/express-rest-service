const taskRepo = require('./task.memory.repository');

const getAll = () => taskRepo.getAll();

const create = ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => taskRepo.create({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
});

const getTask = taskId => taskRepo.getTask(taskId);

const update = (task, {
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => taskRepo.update(task, {
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
});

const deleteTask = taskId => taskRepo.deleteTask(taskId);

module.exports = { getAll, create, getTask, update, deleteTask };

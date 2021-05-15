const taskRepo = require('./task.memory.repository');

const getAll = () => taskRepo.getAll();

const create = payload => taskRepo.create(payload);

const getTask = taskId => taskRepo.getTask(taskId);

const update = (task, payload) => taskRepo.update(task, payload);

const deleteTask = taskId => taskRepo.deleteTask(taskId);

module.exports = { getAll, create, getTask, update, deleteTask };

const taskRepo = require('./task.memory.repository');

const getByBoardId = boardId => taskRepo.getByBoardId(boardId);

const create = payload => taskRepo.create(payload);

const getTask = (taskId, boardId) => taskRepo.getTask(taskId, boardId);

const update = (task, payload) => taskRepo.update(task, payload);

const deleteTask = taskId => taskRepo.deleteTask(taskId);

module.exports = { getByBoardId, create, getTask, update, deleteTask };

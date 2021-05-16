const taskService = require('./task.service');
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');

// board should be in res.locals

const getTask = async (req, res, next) => {
  const { id: boardId } = res.locals.board || {};
  const { taskId } = req.params;
  try {
    res.locals.task = await taskService.getTask(taskId, boardId);

    next();
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
};

module.exports = { getTask };

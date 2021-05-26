const taskService = require('./task.service');
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');

/**
 * Finds task by params.taskId and sets to res.locals.task
 * @exports
 * @async
 * @param {import('express').Request} req - The request
 * @param {import('express').Response} res - The response
 * @param {import('express').NextFunction} next - The next function
 */
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

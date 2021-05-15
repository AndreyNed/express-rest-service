const taskService = require('./task.service');
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');

const getTask = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    res.locals.task = await taskService.getTask(taskId);

    next();
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
};

module.exports = { getTask };

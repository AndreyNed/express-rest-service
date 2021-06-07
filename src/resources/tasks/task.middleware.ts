import * as express from 'express';

import taskService from './task.service';
import defaultHttpErrorHandler from '../../utils/default.http.error.handler';

/**
 * Finds task by params.taskId and sets to res.locals.task
 * @exports
 * @async
 * @param {express.Request} req - The request
 * @param {express.Response} res - The response
 * @param {express.NextFunction} next - The next function
 */
const getTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const { id: boardId } = res.locals.board || {};
  const { taskId } = req.params;
  try {
    res.locals.task = await taskService.getTask(taskId, boardId);

    next();
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
};

export default getTask;

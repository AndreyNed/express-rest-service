import express = require('express');
import ITask from '../../types/task';

const router = require('express').Router();

const taskMiddleware = require('./task.middleware');
const taskService = require('./task.service');
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');

/** Returns all tasks for board */
router.route('/')
  .get(async (req:express.Request, res:express.Response):Promise<void> => {
    try {
      const tasks:ITask[] = await taskService.getByBoardId(res.locals.board.id);
  
      res.status(200).json(tasks);
    } catch(e) {
      defaultHttpErrorHandler(e, res);
    }
  });

/** Creates and returns task for board */
router.route('/')
  .post(async (req:express.Request, res:express.Response):Promise<void> => {
    try {
      if (!req.body.boardId) req.body.boardId = res.locals.board.id;
      const task = await taskService.create(req.body);
  
      res.status(201).json(task);
    } catch (e) {
      defaultHttpErrorHandler(e, res);
    }
  });

/** Sets task to res.locals.task by params.taskId */
router.use('/:taskId', taskMiddleware.getTask);

/** Returns task by id for given board */
router.route('/:taskId')
  .get(async (req:express.Request, res:express.Response) => {
    res.status(200).json(res.locals.task);
  });

/** Updates and returns task for board */
router.route('/:taskId')
  .put(async (req:express.Request, res:express.Response):Promise<void> => {
    try {
      const task = await taskService.update(
        res.locals.task,
        req.body,
      );
  
      res.status(200).json(task);
    } catch (e) {
      defaultHttpErrorHandler(e, res);
    }
  });

/** Removes task for board */
router.route('/:taskId')
  .delete(async (req:express.Request, res:express.Response):Promise<void> => {
    try {
      await taskService.deleteTask(res.locals.task.id);
  
      res.sendStatus(204);
    } catch (e) {
      defaultHttpErrorHandler(e, res);
    }
  });

module.exports = router;

export {};

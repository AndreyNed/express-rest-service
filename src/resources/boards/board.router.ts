import express = require('express');

import IBoard from '../../types/board';

const router = require('express').Router();

const boardService = require('./board.service');
const boardMiddleware = require('./board.middleware');
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');

/** Returns all boards */
router.route('/').get(async (req:express.Request, res:express.Response):Promise<void> => {
  try {
    const boards:IBoard[] = await boardService.getAll();

    res.status(200).json(boards);
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
});

/** Creates new board and returns it */
router.route('/').post(async (req:express.Request, res:express.Response):Promise<void> => {
  try {
    const board:IBoard = await boardService.create(req.body);

    res.status(201).json(board);
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
});

/** Finds board by params.boardId and sets it to res.locals.board */
router.use('/:boardId', boardMiddleware.getBoard);

/** Returns board by board id */
router.route('/:boardId').get(async (req:express.Request, res:express.Response) => {
  res.status(200).json(res.locals.board);
});

/** updates board with req.body payload and returns updated data */
router.route('/:boardId').put(async (req:express.Request, res:express.Response):Promise<void> => {
  try {
    const board:IBoard = await boardService.update(
      res.locals.board,
      req.body,
    );

    res.status(200).json(board);
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
});

/** removes board by params.boardId */
router.route('/:boardId').delete(async (req:express.Request, res:express.Response):Promise<void> => {
  try {
    await boardService.deleteBoard(res.locals.board.id);

    res.sendStatus(204);
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
});

module.exports = router;

export {};

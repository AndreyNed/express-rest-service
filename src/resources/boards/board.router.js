const router = require('express').Router();

const boardService = require('./board.service');
const boardMiddleware = require('./board.middleware');
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardService.getAll();

    res.status(200).json(boards);
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const board = await boardService.create(req.body);

    res.status(201).json(board);
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
});

router.use('/:boardId', boardMiddleware.getBoard);

router.route('/:boardId').get(async (req, res) => {
  res.status(200).json(res.locals.board);
});

router.route('/:boardId').put(async (req, res) => {
  try {
    const board = await boardService.update(
      res.locals.board,
      req.body,
    );

    res.status(200).json(board);
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
});

router.route('/:boardId').delete(async (req, res) => {
  try {
    await boardService.deleteBoard(res.locals.board.id);

    res.sendStatus(204);
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
});

module.exports = router;

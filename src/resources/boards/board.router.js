const router = require('express').Router();

const boardService = require('./board.service');
const boardMiddleware = require('./board.middleware');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();

  res.status(200).json(boards);
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardService.create({ title, columns });

  res.status(201).json(board);
});

router.use('/:boardId', boardMiddleware.getBoard);

router.route('/:boardId').get(async (req, res) => {
  res.status(200).json(res.locals.board);
});

router.route('/:boardId').put(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardService.update(
    res.locals.board,
    { title, columns }
  );

  res.status(200).json(board);
});

router.route('/:boardId').delete(async (req, res) => {
  await boardService.deleteBoard(res.locals.board.id);
  res.sendStatus(204);
});

module.exports = router;

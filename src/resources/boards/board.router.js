const router = require('express').Router();

const boardService = require('./board.service');
const boardMiddleware = require('./board.middleware');

/** Returns all boards */
router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();

  res.status(200).json(boards);
});

/** Creates new board and returns it */
router.route('/').post(async (req, res) => {
  const board = await boardService.create(req.body);

  res.status(201).json(board);
});

/** Finds board by params.boardId and sets it to res.locals.board */
router.use('/:boardId', boardMiddleware.getBoard);

/** Returns board by board id */
router.route('/:boardId').get(async (req, res) => {
  res.status(200).json(res.locals.board);
});

/** updates board with req.body payload and returns updated data */
router.route('/:boardId').put(async (req, res) => {
  const board = await boardService.update(
    res.locals.board,
    req.body,
  );

  res.status(200).json(board);
});

/** removes board by params.boardId */
router.route('/:boardId').delete(async (req, res) => {
  await boardService.deleteBoard(res.locals.board.id);

  res.sendStatus(204);
});

module.exports = router;

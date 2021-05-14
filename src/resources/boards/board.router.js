const router = require('express').Router();

const boardService = require('./board.service');
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();

  res.status(200).json(boards);
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardService.create({ title, columns });

  res.status(201).json(board);
});

router.route('/:boardId').put(async (req, res) => {
  const { boardId } = req.params;
  const { title, columns } = req.body;
  try {
    const board = await boardService.update({ id: boardId, title, columns });
    res.status(200).json(board);
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
});

router.route('/:boardId').get(async (req, res) => {
  const { boardId } = req.params;

  try {
    const board = await boardService.getBoard(boardId);
    res.status(200).json(board);
  } catch(e) {
    defaultHttpErrorHandler(e, res);
  }
});

router.route('/:boardId').delete(async (req, res) => {
  const { boardId } = req.params;
  try {
    await boardService.deleteBoard(boardId);
    res.sendStatus(204);
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
});

module.exports = router;

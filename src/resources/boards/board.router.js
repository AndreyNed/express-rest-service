const router = require('express').Router();

const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();

  res.status(200).json(boards);
});

module.exports = router;

const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');
const boardService = require('./board.service');

const getBoard = async (req, res, next) => {
  const { boardId } = req.params;
  try {
    res.locals.board = await boardService.getBoard(boardId);
    next();
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
};

module.exports = { getBoard };

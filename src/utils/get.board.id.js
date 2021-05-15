const defaultHttpErrorHandler = require('./default.http.error.handler');
const boardService = require('../resources/boards/board.service');

const getBoard = async (req, res, next) => {
  const { boardId } = req.params;
  try {
    res.locals.board = await boardService.getBoard(boardId);
    next();
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
};

module.exports = getBoard;

import * as express from 'express';

import defaultHttpErrorHandler from '../../utils/default.http.error.handler';
import boardService from './board.service';

/**
 * Finds board by params.id and sets to res.locals.board
 * @exports
 * @async
 * @param {express.Request} req - The request
 * @param {express.Response} res - The response
 * @param {express.NextFunction} next - The next function
 */
const getBoard = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const { boardId } = req.params;
  try {
    res.locals.board = await boardService.getBoard(boardId);
    next();
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
};

export default getBoard;

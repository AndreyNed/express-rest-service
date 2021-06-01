"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');
const boardService = require('./board.service');
/**
 * Finds board by params.id and sets to res.locals.board
 * @exports
 * @async
 * @param {express.Request} req - The request
 * @param {express.Response} res - The response
 * @param {express.NextFunction} next - The next function
 */
const getBoard = async (req, res, next) => {
    const { boardId } = req.params;
    try {
        res.locals.board = await boardService.getBoard(boardId);
        next();
    }
    catch (e) {
        defaultHttpErrorHandler(e, res);
    }
};
module.exports = { getBoard };

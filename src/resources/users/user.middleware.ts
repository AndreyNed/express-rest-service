const userService = require('./user.service');
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');
import express = require('express');

/**
 * Middleware - gets user by `req.params.id` and sets to `req`
 * @exports
 * @async
 * @param {express.Request} req - The http request
 * @param {express.Response} res - The http response
 * @param {express.NextFunction} next - used to proceed to next request handler
 */
const getUser = async (
  req:express.Request,
  res:express.Response,
  next:express.NextFunction,
):Promise<void> => {
  const { userId } = req.params;
  try {
    res.locals.user = await userService.getUser(userId);

    next();
  } catch(e) {
    defaultHttpErrorHandler(e, res);
  }
};

module.exports = { getUser };

export {};

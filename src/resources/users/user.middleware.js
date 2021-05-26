const userService = require('./user.service');
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');

/**
 * Middleware - gets user by `req.params.id` and sets to `req`
 * @exports
 * @async
 * @param {import('express').Request} req - The http request
 * @param {import('express').Response} res - The http response
 * @param {import('express').NextFunction} next - used to proceed to next request handler
 */
const getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    res.locals.user = await userService.getUser(userId);

    next();
  } catch(e) {
    defaultHttpErrorHandler(e, res);
  }
};

module.exports = { getUser };

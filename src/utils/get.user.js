const userService = require('../resources/users/user.service');
const defaultHttpErrorHandler = require('./default.http.error.handler');

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    res.locals.user = await userService.getUser(userId);

    next();
  } catch(e) {
    defaultHttpErrorHandler(e, res);
  }
};

module.exports = getUser;

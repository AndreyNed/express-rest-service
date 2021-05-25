const router = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');
const { getUser: middlewareGetUser } = require('./user.middleware');
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');

/** Returns all users without passwords */
router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();

    res.status(200).json(users.map(User.toResponse));
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
});

/** Creates new user and returns their data without passwords */
router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);

  res.status(201).json(User.toResponse(user));
});

/** Finds user by params.userId and sets to res.locals.user */
router.use('/:userId', middlewareGetUser);

/** Returns user by params.userId without password */
router.route('/:userId').get(async (req, res) => {
  res.status(200).json(User.toResponse(res.locals.user));
});

/** Updates user with new data and returns data without password */
router.route('/:userId').put(async (req, res) => {
  const user = await usersService.update(
    res.locals.user,
    req.body,
  );

  res.status(200).json(User.toResponse(user));
});

/** Removes user by params.userId */
router.route('/:userId').delete(async (req, res) => {
  await usersService.deleteUser(res.locals.user.id);

  res.sendStatus(204);
});

module.exports = router;

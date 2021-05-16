const router = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');
const userMiddleware = require('./user.middleware');
const defaultHttpErrorHandler = require('../../utils/default.http.error.handler');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();

    res.status(200).json(users.map(User.toResponse));
  } catch (e) {
    defaultHttpErrorHandler(e, res);
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);

  res.status(201).json(User.toResponse(user));
});

router.use('/:userId', userMiddleware.getUser);

router.route('/:userId').get(async (req, res) => {
  res.status(200).json(User.toResponse(res.locals.user));
});

router.route('/:userId').put(async (req, res) => {
  const user = await usersService.update(
    res.locals.user,
    req.body,
  );

  res.status(200).json(User.toResponse(user));
});

router.route('/:userId').delete(async (req, res) => {
  await usersService.deleteUser(res.locals.user.id);

  res.sendStatus(204);
});

module.exports = router;

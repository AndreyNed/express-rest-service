const router = require('express').Router();

const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.status(200).json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  // Create a new user (remove password from response)
  const user = await usersService.create({ name, login, password });

  res.status(201).json(User.toResponse(user));
});

router.route('/:userId').get(async (req, res) => {
  const { userId } = req.params;
  // Gets a user by ID e.g. “/users/123” (remove password from response)
  try {
    const user = await usersService.getUser(userId);

    res.status(200).json(User.toResponse(user));
  } catch(e) {
    const { status = 500, message = 'Server error' } = e || {};

    res.status(status).send(message);
  }
});

router.route('/:userId').put(async (req, res) => {
  const { userId: id } = req.params;
  const { name, login, password } = req.body;
  // Updates a user by ID
  const user = await usersService.update({ id, name, login, password });

  res.status(200).json(User.toResponse(user));
});

router.route('/:userId').delete(async (req, res) => {
  const { userId } = req.params;
  // Delete a user by ID
  try {
    await usersService.deleteUser(userId);

    res.sendStatus(204);
  } catch (e) {
    const { status = 500, message = 'Server error' } = e || {};

    res.status(status).send(message);
  }
});

module.exports = router;

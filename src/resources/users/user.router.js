const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  // Creates a new user (remove password from response)
  res.sendStatus(501);
});

router.route('/:userId').get(async (req, res) => {
  // Gets a user by ID e.g. “/users/123” (remove password from response)
  res.sendStatus(501);
});

router.route('/:userId').put(async (req, res) => {
  // Updates a user by ID
  res.sendStatus(501);
});

router.route('/:userId').delete(async (req, res) => {
  // Delete a user by ID
  res.sendStatus(501);
});

module.exports = router;

const router = require('express').Router();

const taskMiddleware = require('./task.middleware');

// res.locals should contain board already

router.route('/').get(async (req, res) => {
  const tasks = [];

  res.status(200).json(tasks);
});

router.route('/').post(async (req, res) => {
  res.sendStatus(501);
});

router.use('/:taskId', taskMiddleware.getTaskId);

router.route('/:taskId').get(async (req, res) => {
  res.sendStatus(501);
});

router.route('/:taskId').put(async (req, res) => {
  res.sendStatus(501);
});

router.route('/:taskId').delete(async (req, res) => {
  res.sendStatus(501);
});

module.exports = router;

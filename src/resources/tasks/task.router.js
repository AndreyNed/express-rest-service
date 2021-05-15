const router = require('express').Router();

const getTaskId = require('../../utils/get.task.id');

router.route('/').get(async (req, res) => {
  // const { board } = res.locals;
  const tasks = [];

  res.status(200).json(tasks);
});

router.route('/').post(async (req, res) => {
  res.sendStatus(501);
});

router.use('/:taskId', getTaskId);

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

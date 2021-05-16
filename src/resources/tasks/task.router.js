const router = require('express').Router();

const taskMiddleware = require('./task.middleware');
const taskService = require('./task.service');

// res.locals should contain board already

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getByBoardId(res.locals.board.id);

  res.status(200).json(tasks);
});

router.route('/').post(async (req, res) => {
  if (!req.body.boardId) req.body.boardId = res.locals.board.id;
  const task = await taskService.create(req.body);
  res.status(201).json(task);
});

router.use('/:taskId', taskMiddleware.getTask);

router.route('/:taskId').get(async (req, res) => {
  res.status(200).json(res.locals.task);
});

router.route('/:taskId').put(async (req, res) => {
  const task = await taskService.update(
    res.locals.task,
    req.body,
  );
  res.status(200).json(task);
});

router.route('/:taskId').delete(async (req, res) => {
  await taskService.deleteTask(res.locals.task.id);
  res.sendStatus(204);
});

module.exports = router;

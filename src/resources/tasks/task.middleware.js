const getTaskId = (req, res, next) => {
  const { taskId } = req.params;
  if (!taskId) {
    res.status(400).send('Parameter `taskId` wrong or missed');
  } else {
    res.locals.taskId = taskId;
    next();
  }
};

module.exports = { getTaskId };

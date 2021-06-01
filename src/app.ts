import express = require('express');

import YAML = require('yamljs');

const swaggerUI = require('swagger-ui-express');
const path = require('path');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { getBoard } = require('./resources/boards/board.middleware');

const app:express.Application =  express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use( express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', getBoard, taskRouter);

module.exports = app;

export {};

import * as path from 'path';

import express from 'express';
import * as YAML from 'yamljs';
import * as swaggerUI from 'swagger-ui-express';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import getBoardMiddleware from './resources/boards/board.middleware';

const app: express.Application = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  }
);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', getBoardMiddleware, taskRouter);

export default app;

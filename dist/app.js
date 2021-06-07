import * as path from 'path';
import express from 'express';
import YAML from 'yamljs';
import * as swaggerUI from 'swagger-ui-express';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { getBoard } from './resources/boards/board.middleware';
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', getBoard, taskRouter);
export default app;

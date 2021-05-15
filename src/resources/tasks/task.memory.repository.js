const Task = require('./task.model');

const getAll = async () => (
  [
    {
      id: 'task1',
      title: 'Task One',
      order: 1,
      description: 'To do something',
      userId: 'user1',
      boardId: 'board1',
      columnId: 'board1Column1',
    },
    {
      id: 'task2',
      title: 'Task Two',
      order: 2,
      description: 'To do something else',
      userId: 'user2',
      boardId: 'board2',
      columnId: 'board2Column1',
    },
  ]
);

const create = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => new Task({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
});

const getTask = async taskId => {
  const task = (await getAll()).find(({ id }) => id === taskId);
  if (!task) {
    throw Object.create({ status: 404, message: 'Task not found' });
  }

  return task;
};

const update = async (
  task,
  {
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  },
) => (
  new Task({
    ...task,
    ...(title && { title }),
    ...(order && { order }),
    ...(description && { description }),
    ...(userId && { userId }),
    ...(boardId && { boardId }),
    ...(columnId && { columnId }),
  })
);

const deleteTask = async taskId => {
  // eslint-disable-next-line no-console
  console.log('*** Task was deleted', taskId);

  return true;
};

module.exports = { getAll, create, getTask, update, deleteTask };

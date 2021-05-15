const Board = require('./board.model');

const getAll = async () =>
  // TODO: mock implementation. should be replaced during task development
  [
    {
      id: 'board1',
      title: 'Board One',
      columns: [
        { id: 'board1Column1', title: 'Column One', order: 0 },
        { id: 'board1Column2', title: 'Column Two', order: 1 },
      ],
    },
    {
      id: 'board2',
      title: 'Board Two',
      columns: [
        { id: 'board2Column1', title: 'Column One', order: 0 },
        { id: 'board2Column2', title: 'Column Two', order: 1 },
      ],
    },
  ]
;

const create = async ({ title, columns }) => new Board({ title, columns });

const getBoard = async boardId => {
  const board = (await getAll()).find(({ id }) => id === boardId);

  if (!board) throw Object.create({ status: 404, message: 'Board not found' });

  return board;
};

const update = async (board, { title, columns }) => (
  new Board({
    ...board,
    ...(title && { title }),
    ...(columns && { columns }),
  })
);

const deleteBoard = async boardId => {
  // eslint-disable-next-line no-console
  console.log('*** Board is deleted', boardId);
  return true;
};

module.exports = { getAll, getBoard, create, update, deleteBoard };

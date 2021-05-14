const Board = require('./board.model');

const getAll = async () =>
  // TODO: mock implementation. should be replaced during task development
  [
    {
      id: 'board1',
      title: 'Board One',
      columns: [
        { id: 'Board1Column1', title: 'Column One', order: 0 },
        { id: 'Board1Column2', title: 'Column Two', order: 1 },
      ],
    },
    {
      id: 'board2',
      title: 'Board Two',
      columns: [
        { id: 'Board2Column1', title: 'Column One', order: 0 },
        { id: 'Board2Column2', title: 'Column Two', order: 1 },
      ],
    },
  ]
;

const getBoard = async boardId => {
  const board = (await getAll()).find(({ id }) => id === boardId);

  if (!board) throw Object.create({ status: 404, message: 'Board not found' });

  return board;
};

const create = async ({ title, columns }) => new Board({ title, columns });

const update = async ({ id, title, columns }) => {
  await getBoard(id);

  return new Board({ id, title, columns })
};

const deleteBoard = async boardId => {
  await getBoard(boardId);

  return true;
};

module.exports = { getAll, getBoard, create, update, deleteBoard };

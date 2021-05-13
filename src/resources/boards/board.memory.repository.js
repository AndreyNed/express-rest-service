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

module.exports = { getAll };

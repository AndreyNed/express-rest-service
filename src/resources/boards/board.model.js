const { v4: uuidV4 } = require('uuid');

const Column = require('./board.column.model');

class Board {
  constructor({
    id = uuidV4(),
    title = 'Board',
    columns = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(({ id: columnId, title: columnTitle, order }) => (
      new Column({ id: columnId, title: columnTitle, order })
    ));
  }
}

module.exports = Board;

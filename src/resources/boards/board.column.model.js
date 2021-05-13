const { v4: uuidV4 } = require('uuid');

class Column {
  constructor({
    id = uuidV4(),
    title = 'Column',
    order = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;

import IBoard from '../../types/board';

const { v4: uuidV4 } = require('uuid');

const Column = require('./board.column.model');

/**
 * Represents board data
 * @exports
 * @class
 */
class Board implements IBoard {
  id: string;

  title: string;

  columns: typeof Column[]|[];
  
  /**
   * Creates board object
   * @constructor
   * @param {string} id - The board id
   * @param {string} title - The board title
   * @param {Column[]|[]} columns - The board columns
   */
  constructor({
    id = uuidV4(),
    title = 'Board',
    columns = [],
  } = {}) {
    /** @member {string} */
    this.id = id;

    /** @member {string} */
    this.title = title;

    /** @member {Column[]|[]} */
    this.columns = columns.map(({ id: columnId, title: columnTitle, order }) => (
      new Column({ id: columnId, title: columnTitle, order })
    ));
  }
}

module.exports = Board;

export {};

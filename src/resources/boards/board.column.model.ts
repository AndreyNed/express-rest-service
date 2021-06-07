import { v4 as uuidV4 } from 'uuid';

import IBoardColumn from '../../types/board-column';

/**
 * Represents Column class - for boards column data
 * @exports
 * @class
 */
class Column implements IBoardColumn {
  id: string;

  title: string;

  order: number;

  /**
   * Creates Column instance
   * @constructor
   * @param {string} [id] - The column id
   * @param {string} title - The column title
   * @param {number} [order] - The column order
   */
  constructor({ id = uuidV4(), title = 'Column', order = 0 } = {}) {
    /** @member {string} */
    this.id = id;

    /** @member {string} */
    this.title = title;

    /** @member {number} */
    this.order = order;
  }
}

export default Column;

import { v4 as uuidV4 } from 'uuid';

import IBoard from '../../types/board';
import IBoardColumn from '../../types/board-column';
import Column from './board.column.model';

/**
 * Represents board data
 * @exports
 * @class
 */
class Board implements IBoard {
  id: string;

  title: string;

  columns: IBoardColumn[] | [];

  /**
   * Creates board object
   * @constructor
   * @param {Partial<IBoard>} props - New board props
   */
  constructor(props: Partial<IBoard> = {}) {
    /** @member {string} */
    this.id = props.id || uuidV4();

    /** @member {string} */
    this.title = props.title || 'Board';

    /** @member {IBoardColumn[]|[]} */
    this.columns = (props.columns || []).map(
      (column: IBoardColumn) =>
        new Column({ id: column.id, title: column.title, order: column.order })
    );
  }
}

export default Board;

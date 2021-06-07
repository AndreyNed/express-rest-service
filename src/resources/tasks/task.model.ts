import { v4 as uuidV4 } from 'uuid';

import ITask from '../../types/task';

/**
 * Represents task
 * @exports
 * @class
 */
class Task implements ITask {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  /**
   * Creates task object
   * @constructor
   * @param {Partial<ITask>} props - the task id
   */
  constructor(props: Partial<ITask> = {}) {
    /** @member {string} */
    this.id = props.id || uuidV4();

    /** @member {string} */
    this.title = props.title || '';

    /** @member {number} */
    this.order = props.order || 0;

    /** @member {string} */
    this.description = props.description || '';

    /** @member {string|null} */
    this.userId = props.userId || null;

    /** @member {string|null} */
    this.boardId = props.boardId || null;

    /** @member {string|null} */
    this.columnId = props.columnId || null;
  }
}

export default Task;

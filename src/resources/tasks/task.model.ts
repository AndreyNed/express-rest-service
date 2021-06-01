import ITask from '../../types/task';

const { v4: uuidV4 } = require('uuid');

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
  
  userId: string|null;

  boardId: string|null;

  columnId: string|null;
  
  /**
   * Creates task object
   * @constructor
   * @param {string} id - the task id
   * @param {string} title - the task title
   * @param {number} order - the task order
   * @param {string} description - the task description
   * @param {string|null} userId - the task userId
   * @param {string|null} boardId - the task boardId
   * @param {string|null} columnId - the task columnId
   */
  constructor({
    id = uuidV4(),
    title = 'Task',
    order = 0,
    description = '',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    /** @member {string} */
    this.id = id;

    /** @member {string} */
    this.title = title;

    /** @member {number} */
    this.order = order;

    /** @member {string} */
    this.description = description;

    /** @member {string|null} */
    this.userId = userId;

    /** @member {string|null} */
    this.boardId = boardId;

    /** @member {string|null} */
    this.columnId = columnId;
  }
}

module.exports = Task;

export {};

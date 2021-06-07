import * as express from 'express';

import { IRepositoryError } from '../types/errors/repository-error';

/**
 * Http error object
 * @typedef {Object} HttpError - Represents type HttpError
 * @property {number} status - The error status
 * @property {string} message - The error message
 */

/**
 * Sends response with an error
 * @param {RepositoryError} e - The error object
 * @param {express.Response} res - The http response object
 * @returns {void}
 */
const defaultHttpErrorHandler = (
  e: IRepositoryError,
  res: express.Response
): void => {
  const { status = 500, message = 'Server error' } = e || {};

  res.status(status).send(message);
};

export default defaultHttpErrorHandler;

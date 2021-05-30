const { RepositoryError } = require('../types/errors');
import express = require('express');

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
const defaultHttpErrorHandler = (e:typeof RepositoryError, res:express.Response) => {
  const { status = 500, message = 'Server error' } = e || {};

  res.status(status).send(message);
};

module.exports = defaultHttpErrorHandler;

export {};

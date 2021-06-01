"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { RepositoryError } = require('../types/errors');
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
const defaultHttpErrorHandler = (e, res) => {
    const { status = 500, message = 'Server error' } = e || {};
    res.status(status).send(message);
};
module.exports = defaultHttpErrorHandler;

"use strict";
/**
 * Http error object
 * @typedef {Object} HttpError - Represents type HttpError
 * @property {number} status - The error status
 * @property {string} message - The error message
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sends response with an error
 * @param {HttpError} e - The error object
 * @param {import('express').Response} res - The http response object
 * @returns {void}
 */
const defaultHttpErrorHandler = (e, res) => {
    const { status = 500, message = 'Server error' } = e || {};
    res.status(status).send(message);
};
module.exports = defaultHttpErrorHandler;

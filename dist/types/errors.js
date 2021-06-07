"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepositoryError {
    constructor(status = 500, message = 'Server error') {
        this.status = status;
        this.message = message;
    }
}
class NotFoundError extends RepositoryError {
    constructor(message = 'Resource is not found') {
        super(404, message);
    }
}
module.exports = {
    RepositoryError,
    NotFoundError,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepositoryError {
    constructor(status = 500, message = 'Server error') {
        this.status = status;
        this.message = message;
    }
}
module.exports = {
    RepositoryError,
};

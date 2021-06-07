import RepositoryError from './repository-error';
class NotFoundError extends RepositoryError {
    constructor(message = 'Resource is not found') {
        super(404, message);
    }
}
export default NotFoundError;

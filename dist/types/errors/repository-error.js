class RepositoryError {
    constructor(status = 500, message = 'Server error') {
        this.status = status;
        this.message = message;
    }
}
export default RepositoryError;

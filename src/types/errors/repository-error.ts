export interface IRepositoryError {
  status: number;
  message: string;
}

class RepositoryError implements IRepositoryError {
  status: number;

  message: string;

  constructor(status = 500, message = 'Server error') {
    this.status = status;
    this.message = message;
  }
}

export default RepositoryError;

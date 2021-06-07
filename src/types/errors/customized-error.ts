interface ICustomizedError {
  message: string;

  status?: number;
}

interface ICustomizedErrorConstructor {
  new (message: string): ICustomizedError;
}

export default ICustomizedErrorConstructor;

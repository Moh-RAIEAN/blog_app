/* eslint-disable no-unused-vars */
import { TErrorSources } from '../interface/error';

class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errorSources?: TErrorSources,
    stack = '',
  ) {
    super(message);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;

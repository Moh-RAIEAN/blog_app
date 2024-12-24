import { TErrorResponse } from '../interface/error';
import AppError from './AppError';

const handleAppError = (error: AppError): TErrorResponse => {
  const errorObj: TErrorResponse = {
    statusCode: error?.statusCode,
    message: error.message,
    errorSources: error.errorSources || [],
  };
  return errorObj;
};

export default handleAppError;

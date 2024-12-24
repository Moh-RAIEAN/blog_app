/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { TErrorResponse } from '../interface/error';

const handleDuplicateKeyError = (error: any): TErrorResponse => {
  const [path, value] = Object.entries(error.keyValue)[0];
  const errorObj = {
    statusCode: StatusCodes.CONFLICT,
    message: `${value} is a duplicate ${path}`,
    errorSources: [
      { path: path, message: `value \`${value}\` is already in use` },
    ],
  };
  return errorObj;
};

export default handleDuplicateKeyError;

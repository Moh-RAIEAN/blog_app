import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import getConfigOption from '../config';
import AppError from '../errors/AppError';
import handleAppError from '../errors/handleAppError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateKeyError from '../errors/handleDuplicateError';
import handelValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TErrorResponse } from '../interface/error';
import sendResponse from '../utils/sendResponse';

export default function (): ErrorRequestHandler {
  let errorObj: TErrorResponse = {
    success: false,
    message: '',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    errorSources: [],
    stack: '',
  };

  return (error, _, res, next) => {
    errorObj.stack =
      getConfigOption('env') === 'development' ? JSON.stringify(error) : '';
    if (error instanceof ZodError)
      errorObj = { ...errorObj, ...handleZodError(error) };
    else if (error?.name === 'ValidationError')
      errorObj = { ...errorObj, ...handelValidationError(error) };
    else if (error?.name === 'CastError')
      errorObj = { ...errorObj, ...handleCastError(error) };
    else if (error?.code === 11000)
      errorObj = { ...errorObj, ...handleDuplicateKeyError(error) };
    else if (error instanceof AppError)
      errorObj = { ...errorObj, ...handleAppError(error) };
    else if (error instanceof Error)
      errorObj = { ...errorObj, message: error?.message };

    if (res.headersSent) next(error);
    const { errorSources, ...otherErrorData } = errorObj;
    sendResponse(res, { ...otherErrorData, error: { errorSources } });
  };
}

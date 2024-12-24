/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { TErrorResponse } from '../interface/error';

const handelValidationError = (
  error: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorObj: TErrorResponse = {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Validation error',
    errorSources: [],
  };
  const errors = error?.errors;

  errorObj.errorSources = Object.keys(errors).map((error) => {
    const capturedError = errors[error];
    let message = capturedError.message;

    if (capturedError?.name === 'ValidatorError') {
      if (capturedError?.properties?.type === 'enum') {
        const enumValues = (capturedError?.properties as any)?.enumValues?.join(
          '|',
        );
        const receivedValue = capturedError?.properties?.value;
        message = `expected values:- \`${enumValues}\` but received:- \`${receivedValue}\``;
      }
    } else if (capturedError?.name === 'CastError') {
      message = ` \`${capturedError?.value}\` is not a valid ${capturedError.kind}`;
    }

    return { path: capturedError.path, message };
  });

  return errorObj;
};

export default handelValidationError;

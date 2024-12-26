import { Response } from 'express';
import StatusCodes from 'http-status-codes';

export type TResponse<T> = {
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: T;
  error?: {
    [key: string]: unknown;
  };
  stack?: string;
};

export const sendResponse = <T>(
  response: Response,
  responseData: TResponse<T>,
): void => {
  const responseObj: TResponse<T> = {
    success: responseData?.success ?? true,
    message: responseData?.message || '',
    statusCode: responseData?.statusCode || StatusCodes.OK,
  };

  if (responseData?.data) responseObj.data = responseData?.data;
  if (responseData?.error) responseObj.error = responseData?.error;
  if (responseData?.error) responseObj.stack = responseData?.stack ?? '';

  response.status(Number(responseObj.statusCode)).json(responseObj);
};

export default sendResponse;

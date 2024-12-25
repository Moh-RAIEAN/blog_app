import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const routeNotFoundHandler = () =>
  catchAsync(async (_, res) => {
    sendResponse(res, {
      success: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Requested url not found!',
    });
  });

export default routeNotFoundHandler;

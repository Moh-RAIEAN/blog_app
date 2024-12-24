import { StatusCodes } from 'http-status-codes';
import getConfigOption from '../../config';
import { generateMessate } from '../../constants';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const createdUser = await UserServices.createUserIntoDb(userData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: createdUser,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const authData = req.body;
  const { accessToken, refreshToken } = await UserServices.loginUser(authData);
  res.cookie('refreshToken', refreshToken, {
    secure: getConfigOption('env') === 'development',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: generateMessate('loginMessage', ''),
    data: { token: accessToken },
  });
});

export const AuthControllers = { createUser, loginUser };

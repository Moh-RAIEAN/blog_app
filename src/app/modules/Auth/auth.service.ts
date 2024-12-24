import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import getConfigOption from '../../config';
import AppError from '../../errors/AppError';
import pick from '../../utils/pick';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';
import { TAuthPayload } from './auth.interface';
import { createToken } from './auth.utils';

const createUserIntoDb = async (
  payload: TUser,
): Promise<Record<string, unknown>> => {
  const createUserData = pick(payload, ['name', 'email', 'password']);
  const isUserExistWithEmail = await User.findOne({ email: payload?.email });
  if (isUserExistWithEmail?._id)
    throw new AppError(StatusCodes.BAD_REQUEST, 'Validation error', [
      { path: 'email', message: 'email is already in use!' },
    ]);

  const createdUser = await User.create(createUserData);
  if (!createdUser)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'can not create user, internal server error!',
    );

  return createdUser.selectFields(['_id' as keyof TUser, 'name', 'email']);
};

const loginUser = async (
  payload: TAuthPayload,
): Promise<Record<string, unknown>> => {
  const { email, password: givenPassowrd } = payload;
  const isUserExistWithEmail = await User.findOne({ email }).select(
    '+password',
  );
  if (!isUserExistWithEmail?._id)
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials', [
      { path: 'email', message: 'user not found' },
    ]);
  if (isUserExistWithEmail?.isBlocked)
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid credentials', [
      { path: '', message: 'permission denied, account is blocked' },
    ]);

  const savedPassword = isUserExistWithEmail?.password;
  const isPasswordMatched = await bcrypt.compare(givenPassowrd, savedPassword);
  if (!isPasswordMatched)
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials', [
      { path: 'password', message: 'incorrect password' },
    ]);
  const jwtPayload = {
    id: isUserExistWithEmail?._id?.toString(),
    role: isUserExistWithEmail?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    getConfigOption('jwtAccessTokenSecret'),
    getConfigOption('jwtAccessTokenExpiresIn'),
  );
  const refreshToken = createToken(
    jwtPayload,
    getConfigOption('jwtRegreshTokenSecret'),
    getConfigOption('jwtRefreshTokenExpiresIn'),
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const UserServices = { createUserIntoDb, loginUser };

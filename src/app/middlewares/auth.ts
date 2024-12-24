import { StatusCodes } from 'http-status-codes';
import JWT, { JwtPayload } from 'jsonwebtoken';
import getConfigOption from '../config';
import AppError from '../errors/AppError';
import { TUserRoles } from '../interface/commontTypes';
import User from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRoles[]) =>
  catchAsync(async (req, _, next) => {
    const authToken = req.headers.authorization;

    if (!authToken)
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');

    const jwtToken = authToken.split(' ')[1];
    const decoded = JWT.verify(
      jwtToken,
      getConfigOption('jwtAccessTokenSecret'),
    ) as JwtPayload;

    const { id } = decoded;
    const user = await User.findById(id);
    if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    if (user?.isBlocked)
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'Forbidden access, user is blocked',
      );
    const hasUserAccess = requiredRoles.includes(user?.role);
    if (!hasUserAccess)
      throw new AppError(StatusCodes.FORBIDDEN, 'Forbidden Access', [
        { path: 'role', message: 'User role is not permitted for this action' },
      ]);

    req.user = decoded;

    next();
  });

export default auth;

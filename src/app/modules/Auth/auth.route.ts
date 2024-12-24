import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const AuthRoutes: Router = Router();

AuthRoutes.post(
  '/register',
  validateRequest(AuthValidations.createUserValidationZodSchema),
  AuthControllers.createUser,
);
AuthRoutes.post(
  '/login',
  validateRequest(AuthValidations.loginValidationZodSchema),
  AuthControllers.loginUser,
);

export { AuthRoutes };

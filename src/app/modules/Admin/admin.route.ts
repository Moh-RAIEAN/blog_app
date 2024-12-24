import { Router } from 'express';
import { USER_ROLES } from '../../constants';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';

const AdminRoutes: Router = Router();

AdminRoutes.patch(
  '/users/:userId/block',
  auth(USER_ROLES.admin),
  validateRequest(AdminValidations.blockUserZodSchema),
  AdminControllers.blockUser,
);
AdminRoutes.delete(
  '/blogs/:id',
  auth(USER_ROLES.admin),
  validateRequest(AdminValidations.deleteBlogZodSchema),
  AdminControllers.deleteABlog,
);

export { AdminRoutes };

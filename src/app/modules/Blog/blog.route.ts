import { Router } from 'express';
import { USER_ROLES } from '../../constants';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BlogControllers } from './blog.controller';
import { BlogValidations } from './blog.validation';

const BlogRoutes: Router = Router();

BlogRoutes.post(
  '/',
  auth(USER_ROLES.user),
  validateRequest(BlogValidations.createBlogZodSchema),
  BlogControllers.createBlog,
);

BlogRoutes.get('/', BlogControllers.getAllBlogs);

BlogRoutes.patch(
  '/:id',
  auth(USER_ROLES.user),
  validateRequest(BlogValidations.updateBlogZodSchema),
  BlogControllers.updateBlog,
);

BlogRoutes.delete('/:id', auth(USER_ROLES.user), BlogControllers.deleteBlog);

export { BlogRoutes };

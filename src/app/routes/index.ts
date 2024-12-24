import { Router } from 'express';
import catchAsync from '../utils/catchAsync';
import apiRoutes from './apiRoutes';
const serverApiRoutes: Router = Router();

serverApiRoutes.get(
  '/',
  catchAsync(async (_, res) => {
    res.json({
      appName: 'Blog App',
      description:
        'The Blog App is a backend for a blogging platform where users can write, update, and delete their blogs. The system will have two roles: Admin and User. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend will include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.',
      author: {
        name: 'Muh.Hasib Al-Raiean',
        email: 'hasibalraiean@gmail.com',
        gitHub: 'https://github.com/Moh-RAIEAN',
      },
    });
  }),
);

apiRoutes.forEach((route) =>
  serverApiRoutes.use(`/api${route.path}`, route.route),
);

export default serverApiRoutes;

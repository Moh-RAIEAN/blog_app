import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import TRoutes from './routeTypes';

const apiRoutes: TRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

export default apiRoutes;

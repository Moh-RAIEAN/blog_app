"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_route_1 = require("../modules/Admin/admin.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const blog_route_1 = require("../modules/Blog/blog.route");
const apiRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
];
exports.default = apiRoutes;

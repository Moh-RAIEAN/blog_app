"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const constants_1 = require("../../constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const BlogRoutes = (0, express_1.Router)();
exports.BlogRoutes = BlogRoutes;
BlogRoutes.post('/', (0, auth_1.default)(constants_1.USER_ROLES.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidations.createBlogZodSchema), blog_controller_1.BlogControllers.createBlog);
BlogRoutes.get('/', blog_controller_1.BlogControllers.getAllBlogs);
BlogRoutes.patch('/:id', (0, auth_1.default)(constants_1.USER_ROLES.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidations.updateBlogZodSchema), blog_controller_1.BlogControllers.updateBlog);
BlogRoutes.delete('/:id', (0, auth_1.default)(constants_1.USER_ROLES.user), blog_controller_1.BlogControllers.deleteBlog);

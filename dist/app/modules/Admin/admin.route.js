"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const constants_1 = require("../../constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const AdminRoutes = (0, express_1.Router)();
exports.AdminRoutes = AdminRoutes;
AdminRoutes.patch('/users/:userId/block', (0, auth_1.default)(constants_1.USER_ROLES.admin), (0, validateRequest_1.default)(admin_validation_1.AdminValidations.blockUserZodSchema), admin_controller_1.AdminControllers.blockUser);
AdminRoutes.delete('/blogs/:id', (0, auth_1.default)(constants_1.USER_ROLES.admin), (0, validateRequest_1.default)(admin_validation_1.AdminValidations.deleteBlogZodSchema), admin_controller_1.AdminControllers.deleteABlog);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const apiRoutes_1 = __importDefault(require("./apiRoutes"));
const serverApiRoutes = (0, express_1.Router)();
serverApiRoutes.get('/', (0, catchAsync_1.default)((_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        appName: 'Blog App',
        description: 'The Blog App is a backend for a blogging platform where users can write, update, and delete their blogs. The system will have two roles: Admin and User. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend will include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.',
        author: {
            name: 'Muh.Hasib Al-Raiean',
            email: 'hasibalraiean@gmail.com',
            gitHub: 'https://github.com/Moh-RAIEAN',
        },
    });
})));
apiRoutes_1.default.forEach((route) => serverApiRoutes.use(`/api${route.path}`, route.route));
exports.default = serverApiRoutes;

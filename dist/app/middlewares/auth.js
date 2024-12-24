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
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = __importDefault(require("../modules/User/user.model"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = (...requiredRoles) => (0, catchAsync_1.default)((req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = req.headers.authorization;
    if (!authToken)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    const jwtToken = authToken.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(jwtToken, (0, config_1.default)('jwtAccessTokenSecret'));
    const { id } = decoded;
    const user = yield user_model_1.default.findById(id);
    if (!user)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    if (user === null || user === void 0 ? void 0 : user.isBlocked)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Forbidden access, user is blocked');
    const hasUserAccess = requiredRoles.includes(user === null || user === void 0 ? void 0 : user.role);
    if (!hasUserAccess)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Forbidden Access', [
            { path: 'role', message: 'User role is not permitted for this action' },
        ]);
    req.user = decoded;
    next();
}));
exports.default = auth;

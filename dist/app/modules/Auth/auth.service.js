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
exports.UserServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const pick_1 = __importDefault(require("../../utils/pick"));
const user_model_1 = __importDefault(require("../User/user.model"));
const auth_utils_1 = require("./auth.utils");
const createUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserData = (0, pick_1.default)(payload, ['name', 'email', 'password']);
    const isUserExistWithEmail = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isUserExistWithEmail === null || isUserExistWithEmail === void 0 ? void 0 : isUserExistWithEmail._id)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Validation error', [
            { path: 'email', message: 'email is already in use!' },
        ]);
    const createdUser = yield user_model_1.default.create(createUserData);
    if (!createdUser)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'can not create user, internal server error!');
    return createdUser.selectFields(['_id', 'name', 'email']);
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password: givenPassowrd } = payload;
    const isUserExistWithEmail = yield user_model_1.default.findOne({ email }).select('+password');
    if (!(isUserExistWithEmail === null || isUserExistWithEmail === void 0 ? void 0 : isUserExistWithEmail._id))
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid credentials', [
            { path: 'email', message: 'user not found' },
        ]);
    if (isUserExistWithEmail === null || isUserExistWithEmail === void 0 ? void 0 : isUserExistWithEmail.isBlocked)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Invalid credentials', [
            { path: '', message: 'permission denied, account is blocked' },
        ]);
    const savedPassword = isUserExistWithEmail === null || isUserExistWithEmail === void 0 ? void 0 : isUserExistWithEmail.password;
    const isPasswordMatched = yield bcrypt_1.default.compare(givenPassowrd, savedPassword);
    if (!isPasswordMatched)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid credentials', [
            { path: 'password', message: 'incorrect password' },
        ]);
    const jwtPayload = {
        id: (_a = isUserExistWithEmail === null || isUserExistWithEmail === void 0 ? void 0 : isUserExistWithEmail._id) === null || _a === void 0 ? void 0 : _a.toString(),
        role: isUserExistWithEmail === null || isUserExistWithEmail === void 0 ? void 0 : isUserExistWithEmail.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, (0, config_1.default)('jwtAccessTokenSecret'), (0, config_1.default)('jwtAccessTokenExpiresIn'));
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, (0, config_1.default)('jwtRegreshTokenSecret'), (0, config_1.default)('jwtRefreshTokenExpiresIn'));
    return {
        accessToken,
        refreshToken,
    };
});
exports.UserServices = { createUserIntoDb, loginUser };

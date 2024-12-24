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
exports.AdminServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = __importDefault(require("../Blog/blog.model"));
const user_model_1 = __importDefault(require("../User/user.model"));
const blockUserInDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.default.findById(userId);
    if (!isUserExist)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'can not block user, user not found');
    const blockedUser = yield user_model_1.default.findByIdAndUpdate(userId, { isBlocked: true }, { new: true, runValidators: true });
    if (!blockedUser)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'can not block user, internal server error');
    return blockedUser;
});
const deleteABlogFromDb = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExist = yield blog_model_1.default.findById(blogId);
    if (!isBlogExist)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'requested blog to delete is not found');
    const deletedBlog = yield blog_model_1.default.findByIdAndDelete(blogId);
    if (!deletedBlog)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'can not delete blog, internal server error');
    return deletedBlog;
});
exports.AdminServices = { blockUserInDb, deleteABlogFromDb };

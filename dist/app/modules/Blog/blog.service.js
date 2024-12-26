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
exports.BlogServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const pick_1 = __importDefault(require("../../utils/pick"));
const user_model_1 = __importDefault(require("../User/user.model"));
const blog_constant_1 = require("./blog.constant");
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlogIntoDb = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.default.findById(userId);
    if (!isUserExist)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isBlocked)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Forbidden access');
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role) !== 'user')
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Forbidden access', [
            {
                path: 'role',
                message: `${isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role} is not permitted for this action`,
            },
        ]);
    payload.author = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id;
    const createdBlog = yield blog_model_1.default.create(payload);
    if (!createdBlog)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Can not create blog, internal server error');
    yield createdBlog.populate('author');
    return createdBlog;
});
const getAllBlogsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search = '', sortBy = 'createdAt', sortOrder = 'desc', filter = '', } = query || {};
    const searchCondition = { $or: [] };
    if (search) {
        searchCondition.$or.push(...blog_constant_1.BlogConstants.SEARCHABLE_FIELDS.map((field) => ({
            [`${field}`]: { $regex: search, $options: 'i' },
        })));
    }
    const filterCondition = {};
    if (filter) {
        filterCondition['author'] = filter;
    }
    const sortCondition = {
        [`${sortBy}`]: sortOrder,
    };
    const fullQueryCondition = { $and: [searchCondition, filterCondition] };
    const allBlogs = yield blog_model_1.default.find(fullQueryCondition)
        .populate('author')
        .sort(sortCondition);
    return allBlogs;
});
const updateBlogIntoDb = (blogId, authorId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const dataToUpdate = (0, pick_1.default)(payload, ['title', 'content', 'isPublished']);
    const isBlogExist = yield blog_model_1.default.findById(blogId);
    if (!isBlogExist)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Requested blog not found');
    if ((isBlogExist === null || isBlogExist === void 0 ? void 0 : isBlogExist.author.toString()) !== authorId)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Forbidden access');
    const updatedBlog = yield blog_model_1.default.findByIdAndUpdate(blogId, dataToUpdate, {
        new: true,
        runValidators: true,
    }).populate('author');
    if (!updatedBlog)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Can not update blog, internal server error');
    return updatedBlog;
});
const deleteBlogFromDb = (blogId, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExist = yield blog_model_1.default.findById(blogId);
    if (!isBlogExist)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Requested blog not found');
    if (isBlogExist.author.toString() !== authorId)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Forbidden access');
    const deletedBlog = yield blog_model_1.default.findOneAndDelete({
        _id: blogId,
        author: authorId,
    }).populate('author');
    if (!deletedBlog)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'can not delete blog, internal server error');
    return deletedBlog.toJSON();
});
exports.BlogServices = {
    createBlogIntoDb,
    getAllBlogsFromDb,
    updateBlogIntoDb,
    deleteBlogFromDb,
};

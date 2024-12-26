"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleAppError_1 = __importDefault(require("../errors/handleAppError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
function default_1() {
    let errorObj = {
        success: false,
        message: '',
        statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        errorSources: [],
        stack: '',
    };
    return (error, _, res, next) => {
        errorObj.stack =
            (0, config_1.default)('env') === 'development' ? JSON.stringify(error) : '';
        if (error instanceof zod_1.ZodError)
            errorObj = Object.assign(Object.assign({}, errorObj), (0, handleZodError_1.default)(error));
        else if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError')
            errorObj = Object.assign(Object.assign({}, errorObj), (0, handleValidationError_1.default)(error));
        else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError')
            errorObj = Object.assign(Object.assign({}, errorObj), (0, handleCastError_1.default)(error));
        else if ((error === null || error === void 0 ? void 0 : error.code) === 11000)
            errorObj = Object.assign(Object.assign({}, errorObj), (0, handleDuplicateError_1.default)(error));
        else if (error instanceof AppError_1.default)
            errorObj = Object.assign(Object.assign({}, errorObj), (0, handleAppError_1.default)(error));
        else if (error instanceof Error)
            errorObj = Object.assign(Object.assign({}, errorObj), { message: error === null || error === void 0 ? void 0 : error.message });
        if (res.headersSent)
            next(error);
        const { errorSources } = errorObj, otherErrorData = __rest(errorObj, ["errorSources"]);
        (0, sendResponse_1.default)(res, Object.assign(Object.assign({}, otherErrorData), { error: { errorSources } }));
    };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleAppError = (error) => {
    const errorObj = {
        statusCode: error === null || error === void 0 ? void 0 : error.statusCode,
        message: error.message,
        errorSources: error.errorSources || [],
    };
    return errorObj;
};
exports.default = handleAppError;

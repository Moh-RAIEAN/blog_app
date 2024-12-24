"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const handleZodError = (error) => {
    const errorObj = {
        statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
        message: 'Validation error',
        errorSources: [],
    };
    const issues = error.issues;
    errorObj.errorSources = issues.map((issue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
    }));
    return errorObj;
};
exports.default = handleZodError;

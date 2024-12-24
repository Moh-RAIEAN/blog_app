"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const handleDuplicateKeyError = (error) => {
    const [path, value] = Object.entries(error.keyValue)[0];
    const errorObj = {
        statusCode: http_status_codes_1.StatusCodes.CONFLICT,
        message: `${value} is a duplicate ${path}`,
        errorSources: [
            { path: path, message: `value \`${value}\` is already in use` },
        ],
    };
    return errorObj;
};
exports.default = handleDuplicateKeyError;

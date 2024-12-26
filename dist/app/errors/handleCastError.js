"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const handleCastError = (error) => {
    const errorObj = {
        statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
        message: '',
        errorSources: [],
    };
    errorObj.message = `Validation error`;
    return Object.assign(Object.assign({}, errorObj), { errorSources: [
            {
                path: error.path,
                message: `\`${error.value}\` is not a valid ${error.kind} value for:- ${error.path}`,
            },
        ] });
};
exports.default = handleCastError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = require("http-status-codes");
const handelValidationError = (error) => {
    const errorObj = {
        statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
        message: 'Validation error',
        errorSources: [],
    };
    const errors = error === null || error === void 0 ? void 0 : error.errors;
    errorObj.errorSources = Object.keys(errors).map((error) => {
        var _a, _b, _c, _d;
        const capturedError = errors[error];
        let message = capturedError.message;
        if ((capturedError === null || capturedError === void 0 ? void 0 : capturedError.name) === 'ValidatorError') {
            if (((_a = capturedError === null || capturedError === void 0 ? void 0 : capturedError.properties) === null || _a === void 0 ? void 0 : _a.type) === 'enum') {
                const enumValues = (_c = (_b = capturedError === null || capturedError === void 0 ? void 0 : capturedError.properties) === null || _b === void 0 ? void 0 : _b.enumValues) === null || _c === void 0 ? void 0 : _c.join('|');
                const receivedValue = (_d = capturedError === null || capturedError === void 0 ? void 0 : capturedError.properties) === null || _d === void 0 ? void 0 : _d.value;
                message = `expected values:- \`${enumValues}\` but received:- \`${receivedValue}\``;
            }
        }
        else if ((capturedError === null || capturedError === void 0 ? void 0 : capturedError.name) === 'CastError') {
            message = ` \`${capturedError === null || capturedError === void 0 ? void 0 : capturedError.value}\` is not a valid ${capturedError.kind}`;
        }
        return { path: capturedError.path, message };
    });
    return errorObj;
};
exports.default = handelValidationError;

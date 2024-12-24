"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse = (response, responseData) => {
    var _a;
    const responseObj = {
        success: (_a = responseData === null || responseData === void 0 ? void 0 : responseData.success) !== null && _a !== void 0 ? _a : true,
        message: (responseData === null || responseData === void 0 ? void 0 : responseData.message) || '',
        statusCode: (responseData === null || responseData === void 0 ? void 0 : responseData.statusCode) || http_status_codes_1.default.OK,
    };
    if (responseData === null || responseData === void 0 ? void 0 : responseData.data)
        responseObj.data = responseData === null || responseData === void 0 ? void 0 : responseData.data;
    if (responseData === null || responseData === void 0 ? void 0 : responseData.error)
        responseObj.error = responseData === null || responseData === void 0 ? void 0 : responseData.error;
    if (responseData === null || responseData === void 0 ? void 0 : responseData.stack)
        responseObj.stack = responseData === null || responseData === void 0 ? void 0 : responseData.stack;
    response.status(Number(responseObj.statusCode)).json(responseObj);
};
exports.sendResponse = sendResponse;
exports.default = exports.sendResponse;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessate = exports.excludeFieldsFromFilterQuery = exports.USER_ROLES_LIST = exports.USER_ROLES = void 0;
exports.USER_ROLES = {
    admin: 'admin',
    user: 'user',
};
exports.USER_ROLES_LIST = Object.keys(exports.USER_ROLES);
exports.excludeFieldsFromFilterQuery = [
    'searchTerm',
    'sort',
    'page',
    'skip',
    'limit',
    'fields',
];
const generateMessate = (type, path, options) => {
    var _a;
    switch (type) {
        case 'requiredError':
            return `${path} is required`;
        case 'minLengthError':
            return `${path} must be minimum ${options === null || options === void 0 ? void 0 : options.length} characters long`;
        case 'maxLengthError':
            return `${path} can not be more than ${options === null || options === void 0 ? void 0 : options.length} characters`;
        case 'enumTypeError':
            return `expected \`${(_a = options === null || options === void 0 ? void 0 : options.enums) === null || _a === void 0 ? void 0 : _a.join('|')}\` but received ${options === null || options === void 0 ? void 0 : options.value}`;
        case 'createdMessage':
            return `${path} registered successfully`;
        case 'loginMessage':
            return `${path}Login successful`;
    }
};
exports.generateMessate = generateMessate;

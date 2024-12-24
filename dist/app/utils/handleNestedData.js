"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleNestedData = (data, fieldName) => {
    const modifiedData = {};
    for (const [key, value] of Object.entries(data)) {
        modifiedData[`${fieldName}.${key}`] = value;
    }
    return modifiedData;
};
exports.default = handleNestedData;

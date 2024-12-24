"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const filteredObj = {};
    keys.forEach((key) => {
        filteredObj[key.toString()] = obj[key];
    });
    return filteredObj;
};
exports.default = pick;

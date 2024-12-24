"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pickValuesFromArray;
/* eslint-disable @typescript-eslint/no-explicit-any */
function pickValuesFromArray(sourceArray, valuesToPick) {
    return sourceArray.filter((item) => valuesToPick.includes(item));
}

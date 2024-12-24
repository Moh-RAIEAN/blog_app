"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidations = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../constants");
const blockUserZodSchema = zod_1.z.object({
    params: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: (0, constants_1.generateMessate)('requiredError', 'userId'),
        }),
    }),
});
const deleteBlogZodSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: (0, constants_1.generateMessate)('requiredError', 'id'),
        }),
    }),
});
exports.AdminValidations = { blockUserZodSchema, deleteBlogZodSchema };

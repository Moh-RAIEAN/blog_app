"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidations = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../constants");
const createBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().trim(),
        content: zod_1.z.string().trim(),
    }),
});
const updateBlogZodSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: (0, constants_1.generateMessate)('requiredError', 'id') }),
    }),
    body: zod_1.z.object({
        title: zod_1.z.string().trim().optional(),
        content: zod_1.z.string().trim().optional(),
    }),
});
exports.BlogValidations = { createBlogZodSchema, updateBlogZodSchema };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../constants");
const emailValidationZodSchema = zod_1.z
    .string({ required_error: (0, constants_1.generateMessate)('requiredError', 'email') })
    .trim()
    .refine((value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
}, (value) => ({ message: `${value} is not a valid Email` }));
const createUserValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: (0, constants_1.generateMessate)('requiredError', 'name') })
            .max(20, (0, constants_1.generateMessate)('maxLengthError', 'name'))
            .trim(),
        email: emailValidationZodSchema,
        password: zod_1.z.string({
            required_error: (0, constants_1.generateMessate)('requiredError', 'password'),
        }),
    }),
});
const loginValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: emailValidationZodSchema,
        password: zod_1.z.string({
            required_error: (0, constants_1.generateMessate)('requiredError', 'password'),
        }),
    }),
});
exports.AuthValidations = {
    createUserValidationZodSchema,
    loginValidationZodSchema,
};

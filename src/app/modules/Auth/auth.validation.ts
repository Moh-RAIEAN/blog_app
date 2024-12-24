import { z } from 'zod';
import { generateMessate } from '../../constants';

const emailValidationZodSchema = z
  .string({ required_error: generateMessate('requiredError', 'email') })
  .trim()
  .refine(
    (value) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(value);
    },
    (value) => ({ message: `${value} is not a valid Email` }),
  );

const createUserValidationZodSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: generateMessate('requiredError', 'name') })
      .max(20, generateMessate('maxLengthError', 'name'))
      .trim(),
    email: emailValidationZodSchema,
    password: z.string({
      required_error: generateMessate('requiredError', 'password'),
    }),
  }),
});

const loginValidationZodSchema = z.object({
  body: z.object({
    email: emailValidationZodSchema,
    password: z.string({
      required_error: generateMessate('requiredError', 'password'),
    }),
  }),
});

export const AuthValidations = {
  createUserValidationZodSchema,
  loginValidationZodSchema,
};

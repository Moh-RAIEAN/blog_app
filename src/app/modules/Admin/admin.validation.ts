import { z } from 'zod';
import { generateMessate } from '../../constants';

const blockUserZodSchema = z.object({
  params: z.object({
    userId: z.string({
      required_error: generateMessate('requiredError', 'userId'),
    }),
  }),
});

const deleteBlogZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: generateMessate('requiredError', 'id'),
    }),
  }),
});

export const AdminValidations = { blockUserZodSchema, deleteBlogZodSchema };

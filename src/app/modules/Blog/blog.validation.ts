import { z } from 'zod';
import { generateMessate } from '../../constants';

const createBlogZodSchema = z.object({
  body: z.object({
    title: z.string().trim(),
    content: z.string().trim(),
  }),
});

const updateBlogZodSchema = z.object({
  params: z.object({
    id: z.string({ required_error: generateMessate('requiredError', 'id') }),
  }),
  body: z.object({
    title: z.string().trim().optional(),
    content: z.string().trim().optional(),
  }),
});

export const BlogValidations = { createBlogZodSchema, updateBlogZodSchema };

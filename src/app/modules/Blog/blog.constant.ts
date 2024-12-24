import { TBlog } from './blog.interface';

const SEARCHABLE_FIELDS: (keyof TBlog)[] = ['title', 'content'];

export const BlogConstants = { SEARCHABLE_FIELDS };

import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import AppError from '../../errors/AppError';
import pick from '../../utils/pick';
import User from '../User/user.model';
import { BlogConstants } from './blog.constant';
import { TBlog } from './blog.interface';
import Blog from './blog.model';

const createBlogIntoDb = async (
  userId: string,
  payload: TBlog,
): Promise<Partial<TBlog>> => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  if (isUserExist?.isBlocked)
    throw new AppError(StatusCodes.FORBIDDEN, 'Forbidden access');
  if (isUserExist?.role !== 'user')
    throw new AppError(StatusCodes.FORBIDDEN, 'Forbidden access', [
      {
        path: 'role',
        message: `${isUserExist?.role} is not permitted for this action`,
      },
    ]);
  payload.author = isUserExist?._id;
  const createdBlog = await Blog.create(payload);
  if (!createdBlog)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Can not create blog, internal server error',
    );
  await createdBlog.populate('author');
  return createdBlog;
};

const getAllBlogsFromDb = async (
  query: Record<string, unknown>,
): Promise<TBlog[]> => {
  const {
    search = '',
    sortBy = 'createdAt',
    sortOrder = 'desc',
    filter = '',
  } = query || {};
  const searchCondition: Record<string, Array<unknown>> = { $or: [] };

  if (search) {
    searchCondition.$or.push(
      ...BlogConstants.SEARCHABLE_FIELDS.map((field) => ({
        [`${field}`]: { $regex: search, $options: 'i' },
      })),
    );
  }

  const filterCondition: Record<string, unknown> = {};
  if (filter) {
    filterCondition['author'] = filter;
  }
  const sortCondition: { [key: string]: SortOrder } = {
    [`${sortBy}`]: sortOrder as SortOrder,
  };

  const fullQueryCondition = { $and: [searchCondition, filterCondition] };
  const allBlogs = await Blog.find(fullQueryCondition)
    .populate('author')
    .sort(sortCondition);
  return allBlogs;
};

const updateBlogIntoDb = async (
  blogId: string,
  authorId: string,
  payload: Partial<TBlog>,
): Promise<Partial<TBlog>> => {
  const dataToUpdate = pick(payload, ['title', 'content', 'isPublished']);

  const isBlogExist = await Blog.findById(blogId);
  if (!isBlogExist)
    throw new AppError(StatusCodes.NOT_FOUND, 'Requested blog not found');

  if (isBlogExist?.author.toString() !== authorId)
    throw new AppError(StatusCodes.FORBIDDEN, 'Forbidden access');

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, dataToUpdate, {
    new: true,
    runValidators: true,
  }).populate('author');
  if (!updatedBlog)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Can not update blog, internal server error',
    );
  return updatedBlog;
};

const deleteBlogFromDb = async (
  blogId: string,
  authorId: string,
): Promise<TBlog> => {
  const isBlogExist = await Blog.findById(blogId);
  if (!isBlogExist)
    throw new AppError(StatusCodes.NOT_FOUND, 'Requested blog not found');
  if (isBlogExist.author.toString() !== authorId)
    throw new AppError(StatusCodes.FORBIDDEN, 'Forbidden access');
  const deletedBlog = await Blog.findOneAndDelete({
    _id: blogId,
    author: authorId,
  }).populate('author');
  if (!deletedBlog)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'can not delete blog, internal server error',
    );
  return deletedBlog.toJSON();
};

export const BlogServices = {
  createBlogIntoDb,
  getAllBlogsFromDb,
  updateBlogIntoDb,
  deleteBlogFromDb,
};

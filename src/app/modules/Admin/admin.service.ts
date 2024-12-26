import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TBlog } from '../Blog/blog.interface';
import Blog from '../Blog/blog.model';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';

const blockUserInDb = async (userId: string): Promise<TUser> => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  const blockedUser = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true, runValidators: true },
  );
  if (!blockedUser)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Can not block user, internal server error',
    );
  return blockedUser;
};

const deleteABlogFromDb = async (blogId: string): Promise<TBlog> => {
  const isBlogExist = await Blog.findById(blogId);
  if (!isBlogExist) throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  const deletedBlog = await Blog.findByIdAndDelete(blogId);
  if (!deletedBlog)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Can not delete blog, internal server error',
    );
  return deletedBlog;
};

export const AdminServices = { blockUserInDb, deleteABlogFromDb };

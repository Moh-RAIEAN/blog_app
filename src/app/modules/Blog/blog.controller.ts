import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const { id } = req.user;
  const bolgData = req.body;
  const createdBlog = await BlogServices.createBlogIntoDb(id, bolgData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Blog created successfully',
    data: createdBlog,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const allBlogs = await BlogServices.getAllBlogsFromDb(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blogs fetched successfully',
    data: allBlogs,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { id: blogId } = req.params;
  const updatedBlogData = req.body;
  const updatedBlog = await BlogServices.updateBlogIntoDb(
    blogId,
    userId,
    updatedBlogData,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog updated successfully',
    data: updatedBlog,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { id: blogId } = req.params;
  await BlogServices.deleteBlogFromDb(blogId, userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};

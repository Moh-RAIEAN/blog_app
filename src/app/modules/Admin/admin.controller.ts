import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await AdminServices.blockUserInDb(userId);
  sendResponse(res, { message: 'User blocked successfully' });
});

const deleteABlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminServices.deleteABlogFromDb(id);
  sendResponse(res, { message: 'Blog deleted successfully' });
});

export const AdminControllers = { blockUser, deleteABlog };

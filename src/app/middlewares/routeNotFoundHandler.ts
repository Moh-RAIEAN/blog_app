import catchAsync from '../utils/catchAsync';

const routeNotFoundHandler = () =>
  catchAsync(async (_, res) => {
    res.status(404).json({ status: 404, message: 'requested url not found!' });
  });

export default routeNotFoundHandler;

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorhandler from './app/middlewares/globalErrorhandler';
import routeNotFoundHandler from './app/middlewares/routeNotFoundHandler';
import serverApiRoutes from './app/routes';

const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5000' }));
app.use('/', serverApiRoutes);
app.use(routeNotFoundHandler());
app.use(globalErrorhandler());

export default app;

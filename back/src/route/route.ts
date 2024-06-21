import { Express } from 'express';
import { AppRoute } from '../enums/enums';
import { userRouter } from './user-route';
const initRoutes = (app: Express) => {
	app.use(`${AppRoute.ROOT}${AppRoute.USER}`, userRouter);
};
export { initRoutes };

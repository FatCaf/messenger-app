import { Express } from 'express';
import { AppRoute } from '../enums/enums';
import { chatRouter } from './chat-route';
import { userRouter } from './user-route';

const initRoutes = (app: Express) => {
	app.use(`${AppRoute.ROOT}${AppRoute.USER}`, userRouter);
	app.use(`${AppRoute.ROOT}${AppRoute.CHAT}`, chatRouter);
};
export { initRoutes };

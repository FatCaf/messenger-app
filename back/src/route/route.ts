import { Express } from 'express';
import { userRouter } from './user-route';
const initRoutes = (app: Express) => {
	app.use('/api/v1/users', userRouter);
};
export { initRoutes };

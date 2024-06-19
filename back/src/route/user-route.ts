import { Router } from 'express';
import userController from '../controller.ts/user-controller';
import { responseMiddleware } from '../middleware/response-middleware';
import { createUserValid } from '../middleware/user-register-middleware';

const userRouter = Router();

userRouter.post(
	'/register',
	createUserValid,
	userController.register,
	responseMiddleware
);
userRouter.post('/login', userController.login, responseMiddleware);
export { userRouter };

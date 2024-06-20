import { Router } from 'express';
import userController from '../controller.ts/controller';
import { responseMiddleware } from '../middleware/response-middleware';
import { createUserValid } from '../middleware/user-register-middleware';

const userRouter = Router();

userRouter.post(
	'/register',
	createUserValid,
	(req, res, next) => userController.register(req, res, next),
	responseMiddleware
);
userRouter.post(
	'/login',
	(req, res, next) => userController.login(req, res, next),
	responseMiddleware
);
userRouter.get(
	'/chats/:id',
	(req, res, next) => userController.getAll(req, res, next),
	responseMiddleware
);
export { userRouter };

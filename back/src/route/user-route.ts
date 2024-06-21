import { Router } from 'express';
import userController from '../controller/controller';
import { AppRoute } from '../enums/enums';
import {
	authMiddleware,
	createUserValid,
	responseMiddleware,
} from '../middleware/middleware';

const userRouter = Router();

userRouter.post(
	`${AppRoute.USER_CREATE}`,
	createUserValid,
	(req, res, next) => userController.register(req, res, next),
	responseMiddleware
);
userRouter.post(
	`${AppRoute.USER_LOGIN}`,
	(req, res, next) => userController.login(req, res, next),
	responseMiddleware
);
userRouter.get(
	`${AppRoute.USER_GET_CONTACTS}`,
	authMiddleware,
	(req, res, next) => userController.getContacts(req, res, next),
	responseMiddleware
);
export { userRouter };

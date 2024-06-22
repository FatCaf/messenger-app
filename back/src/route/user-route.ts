import { Router } from 'express';
import { UserController } from '../controller/controller';
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
	(req, res, next) => UserController.register(req, res, next),
	responseMiddleware
);
userRouter.post(
	`${AppRoute.USER_LOGIN}`,
	(req, res, next) => UserController.login(req, res, next),
	responseMiddleware
);
userRouter.get(
	`${AppRoute.USER_GET_CONTACTS}`,
	authMiddleware,
	(req, res, next) => UserController.getContacts(req, res, next),
	responseMiddleware
);
export { userRouter };

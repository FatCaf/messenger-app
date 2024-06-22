import { Router } from 'express';
import { ChatController } from '../controller/controller';
import { AppRoute } from '../enums/enums';
import { authMiddleware, responseMiddleware } from '../middleware/middleware';
const chatRouter = Router();

chatRouter.post(
	`${AppRoute.CHAT_CREATE}`,
	authMiddleware,
	(req, res, next) => ChatController.create(req, res, next),
	responseMiddleware
);

chatRouter.get(
	`${AppRoute.CHAT_GET_ALL}`,
	authMiddleware,
	(req, res, next) => ChatController.getAll(req, res, next),
	responseMiddleware
);

chatRouter.get(
	`${AppRoute.CHAT_GET_ONE}`,
	authMiddleware,
	(req, res, next) => ChatController.getById(req, res, next),
	responseMiddleware
);

export { chatRouter };

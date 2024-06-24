import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../../enums/enums';
import { chatService, errorService } from '../../service/service';

class ChatController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const chat = await chatService.create(req.body);

			res.status(StatusCode.CREATED);
			res.locals.data = chat;
		} catch (error) {
			if (error instanceof Error) {
				const { statusCode, message } = errorService.createHttpError(error);

				res.status(statusCode);
				res.locals.message = message;
			}
		} finally {
			next();
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const chats = await chatService.getAll(id);

			res.status(StatusCode.OK);
			res.locals.data = chats;
		} catch (error) {
			if (error instanceof Error) {
				const { statusCode, message } = errorService.createHttpError(error);

				res.status(statusCode);
				res.locals.message = message;
			}
		} finally {
			next();
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { ownerId } = req.query;
			console.log(id, ownerId);
			const chat = await chatService.getById(id, ownerId as string);

			res.status(StatusCode.OK);
			res.locals.data = chat;
		} catch (error) {
			if (error instanceof Error) {
				const { statusCode, message } = errorService.createHttpError(error);

				res.status(statusCode);
				res.locals.message = message;
			}
		} finally {
			next();
		}
	}
}

export default new ChatController();

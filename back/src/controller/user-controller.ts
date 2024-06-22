import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/enums';
import { errorService, userService } from '../service/service';
class UserController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			if (res.statusCode !== StatusCode.BAD_REQUEST) {
				const newUser = await userService.create(req.body);

				res.status(StatusCode.CREATED);
				res.locals.data = newUser;
			}
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

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const authorizedUser = await userService.login(req.body);

			res.status(StatusCode.OK);
			res.locals.data = authorizedUser;
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

	async getContacts(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;

			const users = await userService.getAllUsersExceptCurrent(id);
			res.status(StatusCode.OK);
			res.locals.data = { users };
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

export default new UserController();

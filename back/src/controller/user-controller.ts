import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/enums';
import { UserService, errorService } from '../service/service';
class UserController {
	constructor(private readonly userService: UserService) {}
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			if (res.statusCode !== StatusCode.BAD_REQUEST) {
				const newUser = await this.userService.create(req.body);

				res.status(StatusCode.CREATED).json({ message: newUser?.message });
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
			const authorizedUser = await this.userService.login(req.body);

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

			const users = await this.userService.getAllUsersExceptCurrent(id);
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

export default UserController;

import bcryptjs from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '../helpers/get-envs';
import { processUserData } from '../helpers/process-user-data';
import { UserService } from '../service/user-service';
import { User } from '../types/types';

class UserController {
	constructor(private readonly userService: UserService) {}
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			if (res.statusCode !== 400) {
				const { email } = req.body as User;

				const isDuplicateUser = await this.userService.search('email', email);

				if (!isDuplicateUser) {
					const processedUserData = await processUserData(req.body);

					const newUser = await this.userService.create(processedUserData);

					if (newUser) {
						res.status(201);
						res.locals.message = newUser.message;
					} else {
						res.status(400);
						res.locals.message = 'Invalid data!';
					}
				} else {
					res.status(403);
					res.locals.message = 'User already exists!';
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(400);
				res.locals.message = error.message;
			}
		} finally {
			next();
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body as Pick<User, 'email' | 'password'>;

			const user = await this.userService.search('email', email);

			if (user && user.password) {
				const isEqualPasswords = await bcryptjs.compare(
					password,
					user.password
				);

				if (!isEqualPasswords) {
					res.status(401);
					res.locals.message =
						'Failed login attempt! Invalid email or password!';
				} else {
					const token = jsonwebtoken.sign(user.id, JWT_SECRET || '', {
						expiresIn: '24h',
					});

					res.status(200);
					// @ts-ignore
					res.data = { token, user };
				}
			} else {
				res.status(401);
				res.locals.message = 'Failed login attempt! Invalid email or password!';
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(401);
				res.locals.message = error.message;
			}
		} finally {
			next();
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;

			const users = await this.userService.getAllUsersExceptCurrent(id);

			res.status(200);
			// @ts-ignore
			res.data = { users };
		} catch (error) {
			if (error instanceof Error) {
				res.status(500);
				res.locals.message = error.message;
			}
		} finally {
			next();
		}
	}
}

export default UserController;

import bcryptjs from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import userRepository from '../repository/user-repository';
import { processUserData } from '../service/auth-service';
import { User } from '../types/types';

const SECRET =
	'53186f2bcd7725eb157de03c6f11900e32b0261ad4878cfed99826139d0ad1ac';

class UserController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			if (res.statusCode !== 400) {
				const { email } = req.body as User;

				const isDuplicateUser = await userRepository.getByEmail(email);

				if (!isDuplicateUser) {
					const processedUserData = await processUserData(req.body);

					const newUser = await userRepository.register(processedUserData);

					if (newUser) {
						res.status(201);
						res.locals.message = 'Created';
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

			const user = await userRepository.getByEmail(email);

			if (user) {
				const isEqualPasswords = await bcryptjs.compare(
					password,
					user.password
				);

				if (!isEqualPasswords) {
					res.status(401);
					res.statusMessage =
						'Failed login attempt! Invalid email or password!';
				} else {
					const token = jsonwebtoken.sign(user.email, SECRET);

					res.status(200);
					// @ts-ignore
					res.data = { token, user };
				}
			} else {
				res.status(401);
				res.statusMessage = 'Failed login attempt! Invalid email or password!';
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(401);
				res.statusMessage = error.message;
			}
		} finally {
			next();
		}
	}
}

export default new UserController();

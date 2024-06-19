import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import userRepository from '../repository/user-repository';
import { processUserData } from '../service/auth-service';
import { User } from '../types/types';

const SECRET =
	'53186f2bcd7725eb157de03c6f11900e32b0261ad4878cfed99826139d0ad1ac';

class UserController {
	async register(req: Request, res: Response) {
		try {
			const { email } = req.body as User;
			console.log(email);
			const isDuplicateUser = await userRepository.getByEmail(email);
			console.log(isDuplicateUser);
			if (!isDuplicateUser) {
				const processedUserData = await processUserData(req.body);

				const newUser = await userRepository.register(processedUserData);

				if (newUser) {
					res.status(201).json({ message: 'Created' });
				} else res.status(400).json({ message: 'Invalid data!' });
			} else res.status(400).json({ message: 'User already exists!' });
		} catch (error) {
			if (error instanceof Error)
				res.status(400).json({ message: error.message });
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body as Pick<User, 'email' | 'password'>;

			const user = await userRepository.getByEmail(email);

			if (user) {
				const isEqualPasswords = await bcryptjs.compare(
					password,
					user.password
				);

				if (!isEqualPasswords)
					res.status(401).json({
						message: 'Failed login attempt! Invalid email or password!',
					});
				else {
					const token = jsonwebtoken.sign(user.email, SECRET);

					res.status(200).json({ token: token });
				}
			} else
				res.status(401).json({
					message: 'Failed login attempt! Invalid email or password!',
				});
		} catch (error) {
			if (error instanceof Error)
				res.status(404).json({ message: error.message });
		}
	}
}

export default new UserController();

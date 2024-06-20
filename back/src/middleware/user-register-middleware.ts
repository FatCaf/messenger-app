import { NextFunction, Request, Response } from 'express';
import { USER } from '../models/models';
import validationService from '../service/validation-service';

const createUserValid = (req: Request, res: Response, next: NextFunction) => {
	const user = { ...req.body };
	const { ...rest } = USER;

	const data =
		Object.keys(user).length !== Object.keys(rest).length
			? { ...rest, ...user }
			: user;

	const errors = validationService.validate(data, 'user');

	if (Object.keys(errors).length > 0) {
		res.status(400);
		res.locals.message = 'User entity to create isn’t valid';
	}
	next();
};

export { createUserValid };

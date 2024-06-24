import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../../enums/enums';
import { UserModelValidationSchema } from '../../models/models';
import { validationService } from '../../service/service';

const createUserValid = (req: Request, res: Response, next: NextFunction) => {
	const user = { ...req.body };
	const { ...rest } = UserModelValidationSchema;

	const data =
		Object.keys(user).length !== Object.keys(rest).length
			? { ...rest, ...user }
			: user;

	const errors = validationService.validate(data, 'user');

	if (Object.keys(errors).length > 0) {
		res.status(StatusCode.BAD_REQUEST);
		res.locals.message = errors;
	}
	next();
};

export { createUserValid };

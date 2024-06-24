import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorMessages, StatusCode } from '../../enums/enums';
import { JWT_SECRET } from '../../helpers/get-envs';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.replace('Bearer ', '');

	if (!token) {
		res.status(StatusCode.FORBIDDEN).json({ message: ErrorMessages.FORBIDDEN });
		return;
	}

	if (!JWT_SECRET) {
		res
			.status(StatusCode.SERVER_ERROR)
			.json({ message: ErrorMessages.JWT_UNDEFINED });
		return;
	}

	try {
		jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
		next();
	} catch (error) {
		res.status(StatusCode.FORBIDDEN).json({ message: ErrorMessages.FORBIDDEN });
	}
};

export { authMiddleware };

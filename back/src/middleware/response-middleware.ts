import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../enums/enums';

const responseMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	switch (res.statusCode) {
		case StatusCode.BAD_REQUEST:
			res.status(StatusCode.BAD_REQUEST).json({ message: res.locals.message });
			break;
		case StatusCode.OK:
			res.status(StatusCode.OK).json(res.locals.data);
			break;
		case StatusCode.CREATED:
			res.status(StatusCode.CREATED).json({ message: res.locals.message });
			break;
		case StatusCode.SERVER_ERROR:
			res.status(StatusCode.SERVER_ERROR).json({ message: res.locals.message });
		case StatusCode.CONFLICT:
			res.status(StatusCode.CONFLICT).json({ message: res.locals.message });
		case StatusCode.UNAUTHORIZED:
			res.status(StatusCode.UNAUTHORIZED).json({ message: res.locals.message });
		default:
			res.status(StatusCode.SERVER_ERROR).json({ message: res.locals.message });
			break;
	}

	next();
};

export { responseMiddleware };

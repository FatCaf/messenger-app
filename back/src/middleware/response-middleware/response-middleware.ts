import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../../enums/enums';

const responseMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	switch (res.statusCode) {
		case StatusCode.OK:
			res.status(StatusCode.OK).json(res.locals.data);
			break;
		case StatusCode.CREATED:
			res.status(StatusCode.CREATED).json(res.locals.data);
			break;
		case StatusCode.BAD_REQUEST:
			res.status(StatusCode.BAD_REQUEST).json({ message: res.locals.message });
			break;
		case StatusCode.SERVER_ERROR:
			res.status(StatusCode.SERVER_ERROR).json({ message: res.locals.message });
			break;
		case StatusCode.CONFLICT:
			res.status(StatusCode.CONFLICT).json({ message: res.locals.message });
			break;
		case StatusCode.UNAUTHORIZED:
			res.status(StatusCode.UNAUTHORIZED).json({ message: res.locals.message });
			break;
		case StatusCode.NOT_FOUND:
			res.status(StatusCode.NOT_FOUND).json({ message: res.locals.message });
			break;
		case StatusCode.UNPROCESSABLE_ENTITY:
			res
				.status(StatusCode.UNPROCESSABLE_ENTITY)
				.json({ message: res.locals.message });
			break;
		default:
			res.status(StatusCode.SERVER_ERROR).json({ message: res.locals.message });
			break;
	}

	next();
};

export { responseMiddleware };

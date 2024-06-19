import { NextFunction, Request, Response } from 'express';

const responseMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	switch (res.statusCode) {
		case 400:
			res.status(400).json({ message: res.locals.message });
			break;
		case 200:
			// @ts-ignore
			res.status(200).json(res.data);
			break;
		case 201:
			res.status(201).json({ message: res.locals.message });
			break;
		default:
			break;
	}

	next();
};

export { responseMiddleware };

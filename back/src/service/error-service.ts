import { ErrorMessages, StatusCode } from '../enums/enums';
import { HttpError } from '../types/http-error';

class ErrorService {
	createHttpError(error: Error): HttpError {
		let HttpError: HttpError = { statusCode: 0, message: '' };
		switch (error.message) {
			case ErrorMessages.USER_ALREADY_EXISTS:
				HttpError = { statusCode: StatusCode.CONFLICT, message: error.message };
				break;
			case ErrorMessages.USER_UNEXPECTED_ERROR:
				HttpError = {
					statusCode: StatusCode.SERVER_ERROR,
					message: error.message,
				};
				break;
			case ErrorMessages.USER_UNAUTHORIZED:
				HttpError = {
					statusCode: StatusCode.UNAUTHORIZED,
					message: error.message,
				};
			default:
				HttpError = {
					statusCode: StatusCode.SERVER_ERROR,
					message: error.message,
				};
				break;
		}

		return HttpError;
	}
}

export default new ErrorService();

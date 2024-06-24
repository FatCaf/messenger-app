import { ErrorMessages, StatusCode } from '../../enums/enums';
import { AppError } from '../../types/types';

class ErrorService {
	createHttpError(error: Error): AppError {
		let HttpError: AppError = { statusCode: 0, message: '' };
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
			case ErrorMessages.CHAT_UNEXPECTED_ERROR:
				HttpError = {
					statusCode: StatusCode.SERVER_ERROR,
					message: error.message,
				};
				break;
			case ErrorMessages.CHAT_NOT_FOUND:
				HttpError = {
					statusCode: StatusCode.NOT_FOUND,
					message: error.message,
				};
				break;
			case ErrorMessages.CHAT_CANNOT_START:
				HttpError = {
					statusCode: StatusCode.UNPROCESSABLE_ENTITY,
					message: error.message,
				};
				break;
			default:
				HttpError = {
					statusCode: StatusCode.SERVER_ERROR,
					message: error.message,
				};
				break;
		}

		return HttpError;
	}

	createWebsocketError(error: Error): AppError {
		let WebSocketError: AppError = {
			statusCode: 0,
			message: '',
		};

		switch (error.message) {
			case ErrorMessages.MESSAGE_SEND_ERROR:
				WebSocketError = {
					statusCode: StatusCode.WEBSOCKET_SERVER_ERROR,
					message: error.message,
				};
				break;
			case ErrorMessages.FORBIDDEN:
				WebSocketError = {
					statusCode: StatusCode.WEBSOCKET_UNAUTHORIZED,
					message: error.message,
				};
			default:
				WebSocketError = {
					statusCode: StatusCode.WEBSOCKET_SERVER_ERROR,
					message: error.message,
				};
				break;
		}

		return WebSocketError;
	}
}

export default new ErrorService();

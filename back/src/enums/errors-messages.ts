export enum ErrorMessages {
	USER_ALREADY_EXISTS = 'User with this email already exists, use it to login into your account!',
	USER_UNEXPECTED_ERROR = 'Unexpected error while creating user!',
	USER_UNAUTHORIZED = 'Wrong login attempt, invalid login or password!',
	USER_NOT_FOUND = 'User not found!',
	JWT_UNDEFINED = 'JWT_SECRET is not defined or is empty!',
	FORBIDDEN = 'Access denied, you need to sign-in into your account!',
	CHAT_UNEXPECTED_ERROR = "Can't start chat right now, try again later!",
	CHAT_NOT_FOUND = "Can't find this chat!",
	CHAT_CANNOT_START = "Can't start chat with this user, try again alter!",
}

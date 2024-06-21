import { UserValidationSchema } from '../types/user-validation-schema';

export const UserModelValidationSchema: UserValidationSchema = {
	name: '',
	email: '',
	password: '',
} as const;

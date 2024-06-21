import { Error, UserValidationSchema, ValidationRule } from '../types/types';

class ValidationService {
	#modelValidationRules: ValidationRule = {
		user: {
			name: { pattern: /^.+$/, message: "Name can't be empty!" },
			email: {
				pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
				message: 'Email is invalid!',
			},
			password: {
				pattern:
					/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				message:
					'Password should be at least 8 characters, contain one letter, one number and one special character!',
			},
		},
	};

	validate(bodyData: UserValidationSchema, modelName: string): Error {
		const validationRules = this.#modelValidationRules[modelName];
		return Object.keys(bodyData).reduce((acc, item, index, arr) => {
			if (!validationRules.hasOwnProperty(item)) {
				acc[item] = 'There is no such field!';
			} else {
				if (
					!String(bodyData[item as keyof UserValidationSchema])
						.trim()
						.match(validationRules[item].pattern)
				) {
					acc[item] = validationRules[item].message;
				}
			}
			return acc;
		}, {} as Error);
	}
}

export default new ValidationService();

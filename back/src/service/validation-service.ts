import { Error, User, ValidationRule } from '../types/types';

class ValidationService {
	#modelValidationRules: ValidationRule = {
		user: {
			name: { pattern: /^.+$/ },
			email: {
				pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
			},
			password: {
				pattern:
					/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			},
		},
	};

	validate(bodyData: User, modelName: string): Error {
		const validationRules = this.#modelValidationRules[modelName];
		return Object.keys(bodyData).reduce((acc, item, index, arr) => {
			if (!validationRules.hasOwnProperty(item)) {
				acc[item] = 'Incorrect field!';
			} else {
				if (
					!String(bodyData[item as keyof User])
						.trim()
						.match(validationRules[item].pattern)
				) {
					acc[item] = 'Incorrect field';
				}
			}
			return acc;
		}, {} as Error);
	}
}

export default new ValidationService();

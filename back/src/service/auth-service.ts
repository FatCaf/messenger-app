import bcryptjs from 'bcryptjs';
import { User } from '../types/User';

export async function processUserData(data: User): Promise<User> {
	console.log(data);
	const { password } = data;

	const encryptedPassword = await bcryptjs.hash(password, 7);

	return {
		...data,
		password: encryptedPassword,
	};
}

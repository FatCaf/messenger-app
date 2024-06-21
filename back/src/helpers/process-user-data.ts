import bcryptjs from 'bcryptjs';
import { UserCreateDto } from '../dto/dto';

export async function processUserData(
	data: UserCreateDto
): Promise<UserCreateDto> {
	const { password } = data;

	const encryptedPassword = await bcryptjs.hash(password, 7);

	return {
		...data,
		password: encryptedPassword,
	};
}

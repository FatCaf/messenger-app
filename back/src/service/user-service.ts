import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { UserRepositoryImplementation } from '../db/repository/user-repository';
import {
	UserCreateDto,
	UserCreateSuccessDto,
	UserDto,
	UserDtoWithPassword,
	UserLoginDto,
	UserLoginSuccessDto,
} from '../dto/dto';
import { ErrorMessages } from '../enums/enums';
import { JWT_SECRET } from '../helpers/get-envs';
import { processUserData } from '../helpers/process-user-data';

export class UserService {
	constructor(readonly userRepository: UserRepositoryImplementation) {}

	async create(dto: UserCreateDto): Promise<UserCreateSuccessDto> {
		const { email } = dto;

		const isDuplicateUser = await this.search('email', email);

		if (isDuplicateUser) throw new Error(ErrorMessages.USER_ALREADY_EXISTS);

		const processedUserData = await processUserData(dto);

		const newUser = await this.userRepository.create(processedUserData);

		if (!newUser) throw new Error(ErrorMessages.USER_UNEXPECTED_ERROR);

		return newUser;
	}

	async login(dto: UserLoginDto): Promise<UserLoginSuccessDto> {
		const { password, email } = dto;

		const user = await this.search('email', email);

		const isEqualPasswords = await bcryptjs.compare(
			password,
			user?.password || ''
		);

		if (!user || !isEqualPasswords)
			throw new Error(ErrorMessages.USER_UNAUTHORIZED);

		if (!JWT_SECRET) throw new Error(ErrorMessages.JWT_UNDEFINED);

		const token = jsonwebtoken.sign({ id: user.id }, JWT_SECRET, {
			algorithm: 'HS256',
			expiresIn: '24h',
		});

		return new UserLoginSuccessDto(token, {
			id: user.id,
			name: user.name,
			email: user.email,
		});
	}

	async search(
		criteria: string,
		param: string
	): Promise<UserDtoWithPassword | null> {
		return await this.userRepository.search(criteria, param);
	}

	async getAllUsersExceptCurrent(id: string): Promise<UserDto[]> {
		return (await this.userRepository.getAll()).filter(
			(user) => user.id !== id
		);
	}
}

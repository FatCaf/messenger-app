import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepositoryImplementation } from '../../db/repository/user-repository';
import {
	UserCreateDto,
	UserCreateSuccessDto,
	UserDto,
	UserLoginDto,
	UserLoginSuccessDto,
} from '../../dto/dto';
import { ErrorMessages } from '../../enums/enums';
import { JWT_SECRET } from '../../helpers/get-envs';
import { processUserData } from '../../helpers/helpers';
import { Criteria } from '../../types/types';

export class UserService {
	constructor(readonly userRepository: UserRepositoryImplementation) {}

	async create(dto: UserCreateDto): Promise<UserCreateSuccessDto> {
		const { email } = dto;

		const isDuplicateUser = await this.userRepository.getOne('email', email);

		if (isDuplicateUser) throw new Error(ErrorMessages.USER_ALREADY_EXISTS);

		const processedUserData = await processUserData(dto);

		const newUser = await this.userRepository.create(processedUserData);

		if (!newUser) throw new Error(ErrorMessages.USER_UNEXPECTED_ERROR);

		return newUser;
	}

	async login(dto: UserLoginDto): Promise<UserLoginSuccessDto> {
		const { password, email } = dto;

		const user = await this.userRepository.getOne('email', email);

		const isEqualPasswords = await bcryptjs.compare(
			password,
			user?.password || ''
		);

		if (!user || !isEqualPasswords)
			throw new Error(ErrorMessages.USER_UNAUTHORIZED);

		if (!JWT_SECRET) throw new Error(ErrorMessages.JWT_UNDEFINED);

		const token = jwt.sign({ id: user.id }, JWT_SECRET, {
			algorithm: 'HS256',
			expiresIn: '24h',
		});

		return new UserLoginSuccessDto(token, {
			id: user.id,
			name: user.name,
			email: user.email,
		});
	}

	async getOne(criteria: Criteria, param: string): Promise<UserDto> {
		const user = await this.userRepository.getOne(criteria, param);

		if (!user) throw new Error(ErrorMessages.USER_NOT_FOUND);

		return new UserDto(user.id, user.name, user.email);
	}

	async getAllUsersExceptCurrent(id: string): Promise<UserDto[]> {
		return (await this.userRepository.getAll()).filter(
			(user) => user.id !== id
		);
	}
}

import { UserRepositoryImplementation } from '../db/repository/user-repository';
import { UserCreateDto } from '../dto/user-create-dto';
import { UserCreateSuccessDto } from '../dto/user-create-success-dto';
import { UserDto } from '../dto/user-dto';

export class UserService {
	constructor(readonly userRepository: UserRepositoryImplementation) {}

	async create(dto: UserCreateDto): Promise<UserCreateSuccessDto | null> {
		return await this.userRepository.create(dto);
	}
	async search(criteria: string, param: string): Promise<UserDto | null> {
		return await this.userRepository.search(criteria, param);
	}

	async getAllUsersExceptCurrent(id: string): Promise<UserDto[] | []> {
		return (await this.userRepository.getAll()).filter(
			(user) => user.id !== id
		);
	}
}

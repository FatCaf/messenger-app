import { UserCreateDto, UserCreateSuccessDto, UserDto } from '../dto/dto';

export interface UserRepository {
	create(dto: UserCreateDto): Promise<UserCreateSuccessDto | null>;
	getOne(criteria: string, param: string): Promise<UserDto | null>;
	getAll(): Promise<UserDto[] | []>;
}

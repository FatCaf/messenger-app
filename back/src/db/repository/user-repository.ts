import {
	UserCreateDto,
	UserCreateSuccessDto,
	UserDto,
	UserDtoWithPassword,
} from '../../dto/dto';
import { UserRepository } from '../../repository/user-repository';
import { Criteria } from '../../types/search-criteria';
import Collections from '../collections';
import { firestore } from '../init-db';

export class UserRepositoryImplementation implements UserRepository {
	private readonly collection = firestore.collection(Collections.USERS);

	async getOne(
		criteria: Criteria,
		param: string
	): Promise<UserDtoWithPassword | null> {
		const userQuery = await this.collection.where(criteria, '==', param).get();
		if (userQuery.empty) return null;

		const user = userQuery.docs[0];
		const { name, email, password } = user.data();

		return new UserDtoWithPassword(user.id, name, email, password);
	}

	async create(dto: UserCreateDto): Promise<UserCreateSuccessDto | null> {
		const res = await this.collection.add({ ...dto });
		if (!res.id) return null;

		return new UserCreateSuccessDto('Created');
	}

	async getAll(): Promise<UserDto[] | []> {
		const usersQuery = await this.collection.get();

		const users: UserDto[] = [];

		usersQuery.forEach((user) => {
			const { name, email } = user.data();
			users.push(new UserDto(user.id, name, email));
		});

		return users;
	}
}

import { UserCreateDto } from '../../dto/user-create-dto';
import { UserCreateSuccessDto } from '../../dto/user-create-success-dto';
import { UserDto } from '../../dto/user-dto';
import { UserRepository } from '../../repository/user-repository';
import Collections from '../collections';
import { firestore } from '../init-db';

export class UserRepositoryImplementation implements UserRepository {
	private readonly collection = firestore.collection(Collections.USERS);
	async search(criteria: string, param: string): Promise<UserDto | null> {
		try {
			const userQuery = await this.collection
				.where(criteria, '==', param)
				.get();
			if (userQuery.empty) return null;

			const user = userQuery.docs[0];
			const { name, email, password } = user.data();

			return new UserDto(user.id, name, email, password);
		} catch (error) {
			console.error('User not found: ', error);
			throw error;
		}
	}

	async create(dto: UserCreateDto): Promise<UserCreateSuccessDto | null> {
		try {
			const res = await this.collection.add({ ...dto });
			if (res.id) {
				return new UserCreateSuccessDto('Created');
			} else {
				return null;
			}
		} catch (error) {
			console.error('Error creating user: ', error);
			throw error;
		}
	}

	async getAll(): Promise<UserDto[] | []> {
		try {
			const usersQuery = await this.collection.get();

			const users: UserDto[] = [];

			usersQuery.forEach((user) => {
				const { name, email } = user.data();
				users.push(new UserDto(user.id, name, email));
			});

			return users;
		} catch (error) {
			console.error('Error when getting users: ', error);
			throw error;
		}
	}
}

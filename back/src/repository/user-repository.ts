import Collections from '../db/collections';
import { firestore } from '../db/init-db';
import { User } from '../types/types';
class UserRepository {
	async register(data: User) {
		console.log(data);
		return await firestore
			.collection(Collections.USERS)
			.add(data)
			.then((res) => {
				if (res.id) return res.id;
				else return null;
			});
	}

	async getByEmail(email: string): Promise<User | null> {
		console.log(email);
		const userQuery = await firestore
			.collection(Collections.USERS)
			.where('email', '==', email)
			.get()
			.then((res) => {
				if (!res.empty) return res.docs[0].data();
			});

		return (userQuery as User) || null;
	}
}

export default new UserRepository();

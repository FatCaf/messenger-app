import { UserDto } from '../user/user-dto';

export class ChatPreviewDto {
	constructor(
		readonly id: string,
		readonly createdAt: Date,
		readonly interlocutor: UserDto,
		readonly lastMessage?: string,
		readonly lastMessageTimeStamp?: Date
	) {}
}

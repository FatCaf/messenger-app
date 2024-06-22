import { MessageDto } from './message-dto';
import { UserDto } from './user-dto';

export class ChatGetByIdDto {
	constructor(
		readonly id: string,
		readonly chat_owner_id: string,
		readonly interlocutor: UserDto,
		readonly messages?: MessageDto[]
	) {}
}

import { MessageResponseDto } from '../message/message-response-dto';
import { UserDto } from '../user/user-dto';

export class ChatGetByIdDto {
	constructor(
		readonly id: string,
		readonly chat_owner_id: string,
		readonly interlocutor: UserDto,
		readonly messages?: MessageResponseDto[]
	) {}
}

import { admin } from '../../db/init-db';
import { MessageDto } from '../message/message-dto';

export class ChatDto {
	constructor(
		readonly id: string,
		readonly createdAt: admin.firestore.Timestamp,
		readonly participants: [string, string],
		readonly lastMessage?: string,
		readonly lastMessageTimeStamp?: admin.firestore.Timestamp,
		readonly messages?: MessageDto[]
	) {}
}

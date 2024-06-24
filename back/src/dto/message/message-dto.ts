import { admin } from '../../db/init-db';

export class MessageDto {
	constructor(
		readonly messageId: string,
		readonly senderId: string,
		readonly text: string,
		readonly timestamp: admin.firestore.Timestamp,
		readonly attachments: string[]
	) {}
}

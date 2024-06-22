import { admin } from '../db/init-db';

export class MessageDto {
	constructor(
		readonly senderId: string,
		readonly text: string,
		readonly timestamp: admin.firestore.FieldValue,
		readonly attachments: string[],
		readonly edited: boolean,
		readonly deleted: boolean
	) {}
}

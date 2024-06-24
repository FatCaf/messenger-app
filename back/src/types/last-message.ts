import { admin } from '../db/init-db';

export type LastMessage = {
	lastMessage: string;
	lastMessageTimeStamp: admin.firestore.Timestamp;
};

import { admin } from '../../db/init-db';
import { MessageDto } from '../../dto/dto';
import { LastMessage } from '../../types/types';

const checkIfLastMessage = (
	messageIndex: number,
	messages: MessageDto[]
): {
	lastMessage: string;
	lastMessageTimeStamp: admin.firestore.Timestamp;
} => {
	let lastMsg: LastMessage = {
		lastMessage: '',
		lastMessageTimeStamp: admin.firestore.Timestamp.now(),
	};

	switch (true) {
		case messageIndex === messages.length - 1:
			lastMsg = {
				lastMessage: messages[messages.length - 1].text,
				lastMessageTimeStamp: messages[messages.length - 1].timestamp,
			};
			break;
		default:
			return lastMsg;
	}

	return lastMsg;
};

export { checkIfLastMessage };

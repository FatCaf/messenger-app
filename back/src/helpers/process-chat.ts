import { admin } from '../db/init-db';
import { ChatDto, ChatGetByIdDto } from '../dto/dto';
import { userService } from '../service/service';
const processChat = async (
	chat: ChatDto,
	id: string,
	ownerId: string
): Promise<ChatGetByIdDto | null> => {
	const [user1, user2] = chat.participants;
	const interlocutorId = ownerId !== user1 ? user1 : user2;
	const interlocutor = await userService.getOne(
		admin.firestore.FieldPath.documentId(),
		interlocutorId
	);

	if (!interlocutor) return null;

	return new ChatGetByIdDto(id, ownerId, interlocutor, chat?.messages);
};

export { processChat };

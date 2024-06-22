import { ChatDto, ChatPreviewDto, UserDto } from '../dto/dto';
import { userService } from '../service/service';

const processChats = async (
	chats: ChatDto[],
	id: string
): Promise<ChatPreviewDto[]> => {
	const users = await userService.getAllUsersExceptCurrent(id);

	const chatPreviews: ChatPreviewDto[] = chats.map((chat) => {
		const interlocutorId = chat.participants.find(
			(participantId) => participantId !== id
		);
		const interlocutor = users.find(
			(user) => user.id === interlocutorId
		) as UserDto;

		return new ChatPreviewDto(
			chat.id,
			chat.createdAt.toDate(),
			new UserDto(interlocutor.id, interlocutor.name, interlocutor.email),
			chat.lastMessage,
			chat.lastMessageTimeStamp?.toDate()
		);
	});

	return chatPreviews;
};

export { processChats };

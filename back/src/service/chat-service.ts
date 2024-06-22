import { admin } from '../db/init-db';
import { ChatRepositoryImplementation } from '../db/repository/chat-repository';
import {
	ChatCreateDto,
	ChatCreateSuccessDto,
	ChatGetByIdDto,
	ChatPreviewDto,
	MessageDto,
	MessageSendDto,
} from '../dto/dto';
import { ErrorMessages } from '../enums/enums';
import { processChat } from '../helpers/process-chat';
import { processChats } from '../helpers/process-chats';

export class ChatService {
	constructor(readonly chatRepository: ChatRepositoryImplementation) {}

	async create(dto: ChatCreateDto): Promise<ChatCreateSuccessDto> {
		const { participants } = dto;
		const isDuplicateChat = await this.chatRepository.search(
			'participants',
			participants
		);

		if (isDuplicateChat) return new ChatCreateSuccessDto(isDuplicateChat.id);

		const chat = await this.chatRepository.create(dto);

		if (!chat) throw new Error(ErrorMessages.CHAT_UNEXPECTED_ERROR);

		return chat;
	}

	async getAll(id: string): Promise<ChatPreviewDto[]> {
		const chats = (await this.chatRepository.getAll()).filter((chat) => {
			return chat.participants.some((participant) => participant === id);
		});

		if (!chats) throw new Error(ErrorMessages.CHAT_UNEXPECTED_ERROR);

		return await processChats(chats, id);
	}

	async getById(id: string, ownerId: string): Promise<ChatGetByIdDto> {
		const chat = await this.chatRepository.search(
			admin.firestore.FieldPath.documentId(),
			id
		);

		if (!chat) throw new Error(ErrorMessages.CHAT_NOT_FOUND);

		const processedChat = await processChat(chat, id, ownerId);

		if (!processedChat) throw new Error(ErrorMessages.CHAT_CANNOT_START);

		return processedChat;
	}

	async edit(dto: MessageSendDto): Promise<MessageDto> {
		const newMessage = await this.chatRepository.edit(dto);

		if (!newMessage) throw new Error(ErrorMessages.MESSAGE_SEND_ERROR);

		return newMessage;
	}
}

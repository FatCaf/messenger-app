import { admin } from '../../db/init-db';
import { ChatRepositoryImplementation } from '../../db/repository/chat-repository';
import {
	ChatCreateDto,
	ChatCreateSuccessDto,
	ChatGetByIdDto,
	ChatPreviewDto,
	MessageDeleteDto,
	MessageEditDto,
	MessageResponseDto,
	MessageSendDto,
} from '../../dto/dto';
import { ErrorMessages } from '../../enums/enums';
import {
	checkIfLastMessage,
	processChat,
	processChats,
	processMessages,
} from '../../helpers/helpers';

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

	async sendMessage(dto: MessageSendDto): Promise<MessageResponseDto> {
		const { chatId, senderId, text, attachments } = dto;
		const timestamp = admin.firestore.Timestamp.now();
		const messageId = Date.now().toString();

		const isCreated = await this.chatRepository.addMessage(chatId, {
			senderId,
			messageId,
			text,
			timestamp,
			attachments,
		});

		if (!isCreated) throw new Error(ErrorMessages.MESSAGE_SEND_ERROR);

		return new MessageResponseDto(
			messageId,
			senderId,
			text,
			timestamp.toDate(),
			attachments
		);
	}

	async editMessage(dto: MessageEditDto): Promise<MessageResponseDto[]> {
		const { chatId, messageId, text } = dto;

		const chat = await this.chatRepository.search(
			admin.firestore.FieldPath.documentId(),
			chatId
		);

		if (!chat || !chat.messages) throw new Error(ErrorMessages.CHAT_NOT_FOUND);

		const messageIndex = chat.messages.findIndex(
			(msg) => msg.messageId === messageId
		);

		if (messageIndex === -1) throw new Error(ErrorMessages.CHAT_NOT_FOUND);

		const timestamp = admin.firestore.Timestamp.now();

		chat.messages[messageIndex] = {
			...chat.messages[messageIndex],
			text,
			timestamp,
		};

		const lastMsg = checkIfLastMessage(messageIndex, chat.messages);

		const isUpdated = await this.chatRepository.editMessage(
			chatId,
			lastMsg,
			chat.messages
		);

		if (!isUpdated) throw new Error(ErrorMessages.MESSAGE_SEND_ERROR);

		return processMessages(chat.messages);
	}

	async deleteMessage(dto: MessageDeleteDto): Promise<MessageResponseDto[]> {
		const { chatId, messageId } = dto;

		const chat = await this.chatRepository.search(
			admin.firestore.FieldPath.documentId(),
			chatId
		);

		if (!chat || !chat.messages) throw new Error(ErrorMessages.CHAT_NOT_FOUND);

		const filteredMessages = chat.messages.filter(
			(msg) => msg.messageId !== messageId
		);

		const messageIndex = filteredMessages.findIndex(
			(msg) => msg.messageId === messageId
		);

		const messages = await this.chatRepository.deleteMessage(
			chatId,
			filteredMessages
		);

		if (!messages) throw new Error(ErrorMessages.CHAT_UNEXPECTED_ERROR);

		return processMessages(messages);
	}
}

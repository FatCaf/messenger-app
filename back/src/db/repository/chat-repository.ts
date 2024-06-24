import {
	ChatCreateDto,
	ChatCreateSuccessDto,
	ChatDto,
	MessageDto,
} from '../../dto/dto';
import { ChatRepository } from '../../repository/chat-repository';
import { Criteria, LastMessage } from '../../types/types';
import Collections from '../collections';
import { admin, firestore } from '../init-db';

export class ChatRepositoryImplementation implements ChatRepository {
	private readonly collection = firestore.collection(Collections.CHATS);

	async create(dto: ChatCreateDto): Promise<ChatCreateSuccessDto | null> {
		const { participants } = dto;
		const createdAt = admin.firestore.Timestamp.now();
		const chat = await this.collection.add({
			participants,
			createdAt,
		});

		if (!chat.id) return null;

		return new ChatCreateSuccessDto(chat.id);
	}

	async getAll(): Promise<ChatDto[]> {
		const chatsQuery = await this.collection.get();

		const chats: ChatDto[] = [];

		chatsQuery.forEach((chat) => {
			const {
				createdAt,
				participants,
				lastMessage,
				lastMessageTimeStamp,
				messages,
			} = chat.data();

			chats.push(
				new ChatDto(
					chat.id,
					createdAt,
					participants,
					lastMessage,
					lastMessageTimeStamp,
					messages
				)
			);
		});
		return chats;
	}

	async search<T>(
		criteria: Criteria,
		param: string | T[]
	): Promise<ChatDto | null> {
		const chatQuery = await this.collection.where(criteria, '==', param).get();

		if (chatQuery.empty) return null;

		const chat = chatQuery.docs[0];

		const {
			createdAt,
			participants,
			messages,
			lastMessage,
			lastMessageTimeStamp,
		} = chat.data();

		return new ChatDto(
			chat.id,
			createdAt,
			participants,
			lastMessage,
			lastMessageTimeStamp,
			messages
		);
	}

	async addMessage(chatId: string, dto: MessageDto): Promise<boolean> {
		const { senderId, text, attachments, messageId, timestamp } = dto;

		const isAdded = await this.collection.doc(chatId).update({
			lastMessage: text,
			lastMessageTimeStamp: timestamp,
			messages: admin.firestore.FieldValue.arrayUnion({
				messageId,
				senderId,
				text,
				timestamp,
				attachments,
			}),
		});

		return !!isAdded.writeTime;
	}

	async editMessage(
		chatId: string,
		lastMsg: LastMessage,
		dto: MessageDto[]
	): Promise<boolean> {
		const { lastMessage, lastMessageTimeStamp } = lastMsg;
		const isUpdated = await this.collection.doc(chatId).update({
			lastMessage,
			lastMessageTimeStamp,
			messages: dto,
		});

		return !!isUpdated.writeTime;
	}

	async deleteMessage(
		chatId: string,
		messages: MessageDto[] | undefined
	): Promise<MessageDto[] | null> {
		if (!messages) return null;

		const lastMessage =
			messages.length > 0
				? messages[messages.length - 1].text
				: admin.firestore.FieldValue.delete();
		const lastMessageTimeStamp =
			messages.length > 0
				? messages[messages.length - 1].timestamp
				: admin.firestore.FieldValue.delete();

		const updatedChatQuery = await this.collection.doc(chatId).update({
			lastMessage,
			lastMessageTimeStamp,
			messages,
		});

		if (!updatedChatQuery.writeTime) return null;

		return messages;
	}
}

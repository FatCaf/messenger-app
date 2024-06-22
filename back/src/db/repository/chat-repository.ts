import {
	ChatCreateDto,
	ChatCreateSuccessDto,
	ChatDto,
	MessageDto,
	MessageSendDto,
} from '../../dto/dto';
import { ChatRepository } from '../../repository/chat-repository';
import { Criteria } from '../../types/types';
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

		const { createdAt, participants, messages } = chat.data();

		return new ChatDto(chat.id, createdAt, participants, messages);
	}

	async sendMessage(dto: MessageSendDto): Promise<MessageDto | null> {
		throw new Error('Not implemented');
	}
}

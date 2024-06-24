import {
	ChatCreateDto,
	ChatCreateSuccessDto,
	ChatDto,
	MessageDto,
} from '../dto/dto';
import { Criteria, LastMessage } from '../types/types';

export interface ChatRepository {
	create: (dto: ChatCreateDto) => Promise<ChatCreateSuccessDto | null>;
	addMessage: (chatId: string, dto: MessageDto) => Promise<boolean>;
	editMessage: (
		chatId: string,
		lastMsg: LastMessage,
		dto: MessageDto[]
	) => Promise<boolean>;
	deleteMessage: (
		chatId: string,
		processedMessages: MessageDto[]
	) => Promise<MessageDto[] | null>;
	getAll: () => Promise<ChatDto[]>;
	search: <T>(
		criteria: Criteria,
		param: string | T[]
	) => Promise<ChatDto | null>;
}

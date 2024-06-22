import {
	ChatCreateDto,
	ChatCreateSuccessDto,
	ChatDto,
	MessageDto,
	MessageSendDto,
} from '../dto/dto';
import { Criteria } from '../types/types';

export interface ChatRepository {
	create: (dto: ChatCreateDto) => Promise<ChatCreateSuccessDto | null>;
	sendMessage: (dto: MessageSendDto) => Promise<MessageDto | null>;
	getAll: () => Promise<ChatDto[]>;
	search: <T>(
		criteria: Criteria,
		param: string | T[]
	) => Promise<ChatDto | null>;
}

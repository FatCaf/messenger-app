import { ApiRoute } from '../../enums/api-route';
import { ChatCreateRequestDto } from '../../types/chat-create-request-dto';
import { ChatCreateResponseDto } from '../../types/chat-create-response-dto';
import messengerApi from '../api';

const createChat = async (
  data: ChatCreateRequestDto
): Promise<ChatCreateResponseDto> =>
  messengerApi.post(`${ApiRoute.CREATE_CHAT}`, data);

export { createChat };

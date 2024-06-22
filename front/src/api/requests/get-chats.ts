import { ApiRoute } from '../../enums/api-route';
import { ChatsResponseDto } from '../../types/types';
import messengerApi from '../api';

const getChats = async (id: string): Promise<ChatsResponseDto[]> =>
  messengerApi.get(`${ApiRoute.GET_CHATS}${id}`);

export { getChats };

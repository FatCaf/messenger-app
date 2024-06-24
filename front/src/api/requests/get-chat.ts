import { ApiRoute } from '../../enums/api-route';
import { ChatType } from '../../types/types';
import messengerApi from '../api';

const getChat = async (chatId: string, ownerId: string): Promise<ChatType> =>
  messengerApi.get(`${ApiRoute.GET_CHAT}${chatId}?ownerId=${ownerId}`);

export { getChat };

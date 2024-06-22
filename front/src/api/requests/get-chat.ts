import { ApiRoute } from '../../enums/api-route';
import { ChatType } from '../../types/types';
import messengerApi from '../api';

const getChat = async (id: string): Promise<ChatType> =>
  messengerApi.get(`${ApiRoute.GET_CHAT}${id}`);

export { getChat };

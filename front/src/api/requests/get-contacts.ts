import { ApiRoute } from '../../enums/api-route';
import { ContactsResponseDto } from '../../types/contacts/contacts-response-dto';
import messengerApi from '../api';

async function getContacts(id: string): Promise<ContactsResponseDto> {
  return messengerApi.get(`${ApiRoute.GET_CONTACTS}${id}`);
}

export { getContacts };

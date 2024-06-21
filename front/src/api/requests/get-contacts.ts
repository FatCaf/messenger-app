import { ContactsResponseDto } from '../../types/contacts-response-dto';
import messengerApi from '../api';

async function getContacts(id: string): Promise<ContactsResponseDto | null> {
  try {
    return (await messengerApi.get(
      `/users/contacts/${id}`
    )) as ContactsResponseDto;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    return null;
  }
}

export { getContacts };

import { Message } from './message';
import { User } from './user';

export type ChatType = {
  id: string;
  chat_owner_id: string;
  interlocutor: User;
  messages?: Message[];
};

import { Message } from '../message/message';
import { User } from '../user/user';

export type ChatType = {
  id: string;
  chat_owner_id: string;
  interlocutor: User;
  messages?: Message[];
};

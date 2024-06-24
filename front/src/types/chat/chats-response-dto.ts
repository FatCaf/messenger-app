import { User } from '../user/user';

export type ChatsResponseDto = {
  id: string;
  createdAt: Date;
  interlocutor: User;
  lastMessage?: string;
  lastMessageTimeStamp?: Date;
};

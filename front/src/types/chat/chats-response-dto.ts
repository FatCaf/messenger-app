import { User } from './user';

export type ChatsResponseDto = {
  id: string;
  createdAt: Date;
  interlocutor: User;
  lastMessage?: string;
  lastMessageTimeStamp?: Date;
};

import { Message } from './message';

export type MessageEditRequestDto = Partial<Message> & {
  action: string;
  chatId: string;
};

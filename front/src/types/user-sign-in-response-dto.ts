import { User } from './user';

export type UserSignInResponseDto = {
  token: string;
  user: User;
};

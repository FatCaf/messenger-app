import { UserSignInRequestDto, UserSignInResponseDto } from '../../types/types';
import messengerApi from '../api';

async function login(
  data: UserSignInRequestDto
): Promise<UserSignInResponseDto | null> {
  try {
    return (await messengerApi.post(
      '/users/login',
      data
    )) as UserSignInResponseDto;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    return null;
  }
}

export { login };

import { UserSignUpRequestDto, UserSignUpResponseDto } from '../../types/types';
import messengerApi from '../api';

async function register(
  data: UserSignUpRequestDto
): Promise<UserSignUpResponseDto | null> {
  try {
    return (await messengerApi.post(
      '/users/register',
      data
    )) as UserSignUpResponseDto;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    return null;
  }
}

export { register };

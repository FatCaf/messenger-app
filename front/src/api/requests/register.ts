import { UserSignUpRequestDto, UserSignUpResponseDto } from '../../types/types';
import messengerApi from '../api';

async function register(
  data: UserSignUpRequestDto
): Promise<UserSignUpResponseDto> {
  return messengerApi.post('/users/register', data);
}

export { register };

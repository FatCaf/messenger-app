import { UserSignInRequestDto, UserSignInResponseDto } from '../../types/types';
import messengerApi from '../api';

async function login(
  data: UserSignInRequestDto
): Promise<UserSignInResponseDto> {
  return messengerApi.post('/users/login', data);
}

export { login };

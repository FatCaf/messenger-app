export type UserSignUpRequestDto = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

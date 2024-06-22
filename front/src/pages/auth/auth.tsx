import { FC, ReactElement, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, register } from '../../api/requests/requests';
import { AppRoute } from '../../enums/app-route';
import {
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto
} from '../../types/types';
import { SignInForm } from './components/sign-in';
import { SignUpForm } from './components/sign-up';

const Auth: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    if (authToken) navigate(AppRoute.CHATS);
  }, [authToken, navigate]);

  const handleSignUpSubmit = async (
    payload: UserSignUpRequestDto
  ): Promise<void> => {
    const { name, email, password } = payload;
    const data: UserSignUpResponseDto | null = await register({
      name,
      email,
      password
    });

    if (data?.message === 'Created') navigate(AppRoute.SIGN_IN);
  };

  const handleSignInSubmit = async (
    payload: UserSignInRequestDto
  ): Promise<void> => {
    const data: UserSignInResponseDto | null = await login(payload);

    if (data) {
      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate(AppRoute.CHATS);
    }
  };

  const getScreen = (path: string): ReactElement | null => {
    switch (path) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }

      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }

      default: {
        return null;
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <section className="flex flex-col justify-center items-center h-dvh gap-7 w-full">
        <h2>Messenger App</h2>
        {pathname !== AppRoute.SIGN_IN && pathname !== AppRoute.SIGN_UP && (
          <div className="flex flex-col justify-center items-center gap-4 w-2/6">
            <button
              type="button"
              className="w-full bg-green-500 rounded-md p-2"
              onClick={(): void => navigate(AppRoute.SIGN_IN)}
            >
              Sign-in
            </button>
            <div className="flex justify-center items-center gap-2 w-full">
              <hr className="w-full h-2 border-none bg-black rounded-md" />
              <span className="text-xl">Or</span>
              <hr className="w-full h-2 border-none bg-black rounded-md" />
            </div>
            <button
              type="button"
              className="w-full bg-green-500 rounded-md p-2"
              onClick={(): void => navigate(AppRoute.SIGN_UP)}
            >
              Sign-up
            </button>
          </div>
        )}
        {getScreen(pathname)}
      </section>
    </div>
  );
};

export { Auth };

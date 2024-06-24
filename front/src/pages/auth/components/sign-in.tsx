/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-useless-escape */
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../enums/app-route';
import { UserSignInRequestDto } from '../../../types/types';

type Properties = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: FC<Properties> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<UserSignInRequestDto>();

  const handleFormSubmit: SubmitHandler<UserSignInRequestDto> = (
    values
  ): void => {
    onSubmit(values);
    reset();
  };

  return (
    <>
      <form
        name="loginForm"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col justify-center items-center p-2 gap-5 w-[730px]"
      >
        <h2>Login to your account</h2>
        <fieldset className="flex flex-col justify-center items-start gap-3 w-full">
          <label className="flex flex-col justify-center items-start gap-1 w-full">
            Email:
            <input
              className="outline-none p-2 border w-full"
              placeholder="Email"
              type="email"
              {...register('email', {
                required: {
                  value: true,
                  message: "Email field can't be empty!"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-700">{errors.email.message}</p>
            )}
          </label>
          <label className="flex flex-col justify-center items-start gap-1 w-full">
            Password:
            <input
              className="outline-none p-2 border w-full"
              placeholder="Password"
              type="password"
              {...register('password', {
                required: {
                  value: true,
                  message: "Password field can't be empty!"
                }
              })}
            />
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}
          </label>
          <button
            type="submit"
            className="self-center w-full bg-green-500 rounded-md p-3"
          >
            Sign In
          </button>
        </fieldset>
      </form>
      <div>
        <span>New to us?</span>
        <NavLink to={AppRoute.SIGN_UP}>Sign Up</NavLink>
      </div>
    </>
  );
};

export { SignInForm };

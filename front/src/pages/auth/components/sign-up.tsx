/* eslint-disable no-useless-escape */
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../enums/app-route';
import { UserSignUpRequestDto } from '../../../types/types';

type Properties = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset
  } = useForm<UserSignUpRequestDto>();

  const handleFormSubmit: SubmitHandler<UserSignUpRequestDto> = (
    values
  ): void => {
    onSubmit(values);
    reset();
  };

  return (
    <>
      <form
        name="registrationForm"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col justify-center items-center border p-2 gap-5 w-[730px]"
      >
        <h2>Register for free account</h2>
        <fieldset className="flex flex-col justify-center items-start gap-3 w-full">
          <label className="flex flex-col justify-center items-start gap-1 w-full">
            Name:
            <input
              type="text"
              placeholder="Name"
              {...register('name', {
                maxLength: {
                  value: 30,
                  message: 'Name is too long!'
                },
                required: {
                  value: true,
                  message: "Name field can't be empty!"
                }
              })}
              className="outline-none p-2 border w-full"
            />
            {errors.name && (
              <p className="text-red-700">{errors.name.message}</p>
            )}
          </label>
          <label className="flex flex-col justify-center items-start gap-1 w-full">
            Email:
            <input
              placeholder="Email"
              type="email"
              {...register('email', {
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Email is invalid!'
                },
                required: {
                  value: true,
                  message: "Email field can't be empty!"
                }
              })}
              className="outline-none p-2 border w-full"
            />
            {errors.email && (
              <p className="text-red-700">{errors.email.message}</p>
            )}
          </label>
          <label className="flex flex-col justify-center items-start gap-1 w-full">
            Password:
            <input
              placeholder="Password"
              type="password"
              {...register('password', {
                pattern: {
                  value:
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password should be at least 8 characters, contain one letter, one number and one special character!'
                },
                required: {
                  value: true,
                  message: "Password field can't be empty!"
                }
              })}
              className="outline-none p-2 border w-full"
            />
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}
          </label>
          <label className="flex flex-col justify-center items-start gap-1 w-full">
            Confirm password:
            <input
              type="password"
              placeholder="Confirm password"
              {...register('confirmPassword', {
                required: {
                  value: true,
                  message: "Confirm password field can't be empty!"
                },
                validate: (value) => {
                  const { password } = getValues();

                  return password === value || "Password don't match!";
                }
              })}
              className="outline-none p-2 border w-full"
            />
            {errors.confirmPassword && (
              <p className="text-red-700">{errors.confirmPassword.message}</p>
            )}
          </label>
          <button
            type="submit"
            className="self-center w-full bg-green-500 rounded-md p-3"
          >
            Sign Up
          </button>
        </fieldset>
      </form>
      <div>
        <span>Already with us?</span>
        <NavLink to={AppRoute.SIGN_IN}>Sign In</NavLink>
      </div>
    </>
  );
};

export { SignUpForm };

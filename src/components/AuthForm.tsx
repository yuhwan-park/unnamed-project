import { useFormContext } from 'react-hook-form';
import { IFormData } from '../types';

function AuthForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormData>();
  return (
    <>
      <input
        {...register('email', {
          required: {
            value: true,
            message: '필수 항목입니다.',
          },
          pattern: {
            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
            message: '이메일 형식에 맞지 않습니다.',
          },
        })}
        type="text"
        placeholder="email"
      />
      {errors.email?.message ? errors.email.message : null}
      <input
        {...register('password', {
          required: {
            value: true,
            message: '필수 항목입니다.',
          },
          minLength: {
            value: 8,
            message: '8자 이상 입력해주세요.',
          },
        })}
        type="password"
        placeholder="password"
      />
      {errors.password?.message ? errors.password.message : null}
      <input type="submit" value={'submit'} />
    </>
  );
}

export default AuthForm;

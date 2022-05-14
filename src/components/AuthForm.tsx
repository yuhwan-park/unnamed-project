import { useFormContext } from 'react-hook-form';
import { IFormData } from '../types';

interface IAuthFormProps {
  isSignUp: boolean;
}

function AuthForm({ isSignUp }: IAuthFormProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormData>();
  return (
    <>
      {isSignUp ? (
        <input {...register('nickname')} type="text" placeholder="닉네임" />
      ) : null}
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
        placeholder="이메일"
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
        placeholder="비밀번호"
      />
      {errors.password?.message ? errors.password.message : null}
      <input type="submit" value={'submit'} />
    </>
  );
}

export default AuthForm;

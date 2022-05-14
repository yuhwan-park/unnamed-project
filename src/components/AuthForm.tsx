import { useFormContext } from 'react-hook-form';
import {
  ErrorMessage,
  InputContainer,
  SubmitInput,
  TextInput,
} from '../defaultStyle/SignPage';
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
        <InputContainer>
          <i className="fa-solid fa-user"></i>
          <TextInput
            {...register('nickname')}
            type="text"
            placeholder="닉네임 (선택사항)"
          />
        </InputContainer>
      ) : null}
      <InputContainer>
        <i className="fa-solid fa-envelope"></i>
        <TextInput
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
      </InputContainer>
      <ErrorMessage>
        {errors.email?.message ? errors.email.message : null}
      </ErrorMessage>
      <InputContainer>
        <i className="fa-solid fa-lock"></i>
        <TextInput
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
      </InputContainer>
      <ErrorMessage>
        {errors.password?.message ? errors.password.message : null}
      </ErrorMessage>
      <SubmitInput type="submit" value={isSignUp ? '회원가입' : '로그인'} />
    </>
  );
}

export default AuthForm;

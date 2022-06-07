import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useFormContext } from 'react-hook-form';
import {
  ErrorMessage,
  InputContainer,
  SubmitInput,
  TextInput,
} from 'style/sign-page';
import { IFormData } from 'types';

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
          <FontAwesomeIcon icon={faUser} />
          <TextInput
            {...register('nickname')}
            type="text"
            placeholder="닉네임 (선택사항)"
          />
        </InputContainer>
      ) : null}
      <InputContainer>
        <FontAwesomeIcon icon={faEnvelope} />
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
        <FontAwesomeIcon icon={faLock} />
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

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
      {isSignUp && (
        <InputContainer>
          <FontAwesomeIcon icon={faUser} />
          <TextInput
            {...register('nickname')}
            placeholder="닉네임 (선택사항)"
          />
        </InputContainer>
      )}
      <InputContainer>
        <FontAwesomeIcon icon={faEnvelope} />
        <TextInput
          {...register('email', {
            required: '필수 항목입니다.',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
              message: '이메일 형식에 맞지 않습니다.',
            },
          })}
          placeholder="이메일"
        />
      </InputContainer>
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      <InputContainer>
        <FontAwesomeIcon icon={faLock} />
        <TextInput
          {...register('password', {
            required: '필수 항목입니다.',
            minLength: {
              value: 8,
              message: '8자 이상 입력해주세요.',
            },
          })}
          type="password"
          placeholder="비밀번호"
        />
      </InputContainer>
      {errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}
      <SubmitInput type="submit" value={isSignUp ? '회원가입' : '로그인'} />
    </>
  );
}

export default AuthForm;

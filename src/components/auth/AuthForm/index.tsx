// dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// types
import { AuthFormData } from '@types';
// styles
import * as S from 'style/sign-page';

interface IAuthFormProps {
  onSubmit: (args: AuthFormData) => Promise<void>;
}

function AuthForm({ onSubmit }: IAuthFormProps) {
  const [isSignUp, setIsSingUp] = useState(false);
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>();

  useEffect(() => {
    setIsSingUp(location.pathname === '/signup');
  }, [location.pathname]);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      {/* 회원가입 페이지일 때만 닉네임 인풋 렌더 */}
      {isSignUp && (
        <S.InputContainer>
          <FontAwesomeIcon icon={faUser} />
          <S.TextInput
            {...register('nickname')}
            placeholder="닉네임 (선택사항)"
          />
        </S.InputContainer>
      )}

      {/* 이메일 인풋 */}
      <S.InputContainer>
        <FontAwesomeIcon icon={faEnvelope} />
        <S.TextInput
          {...register('email', {
            required: '필수 항목입니다.',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
              message: '이메일 형식에 맞지 않습니다.',
            },
          })}
          placeholder="이메일"
        />
      </S.InputContainer>
      {errors.email && <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>}

      {/* 비밀번호 인풋 */}
      <S.InputContainer>
        <FontAwesomeIcon icon={faLock} />
        <S.TextInput
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
      </S.InputContainer>
      {errors.password && (
        <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
      )}

      <S.SubmitInput type="submit" value={isSignUp ? '회원가입' : '로그인'} />
    </S.Form>
  );
}

export default AuthForm;

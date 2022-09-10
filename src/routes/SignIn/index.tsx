// dependencies
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// components
import AuthForm from 'components/auth/AuthForm';
import SocialLogin from 'components/auth/SocialLogin';
import Loading from 'components/common/Loading';
// types
import { AuthFormData } from '@types';
// sources
import { auth } from 'firebase-source';
// styles
import * as S from 'style/sign-page';

function SignIn() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const navigator = useNavigate();

  const onSignIn = async ({ email, password }: AuthFormData) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('등록되지 않은 이메일입니다.');
      } else if (err.code === 'auth/wrong-password') {
        setError('잘못된 비밀번호를 입력하였습니다.');
      }
    }
  };

  useEffect(() => {
    setIsLoggingIn(sessionStorage.length > 0);
  }, [isLoggingIn]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        navigator('/main');
      }
    });
  }, [navigator]);

  return (
    <S.Container>
      {/* 구글 로그인 중일 때 보여주는 로딩 */}
      {isLoggingIn && <Loading />}

      <Link to={'/'}>
        <S.Logo>dail</S.Logo>
      </Link>

      <S.FormContainer>
        <AuthForm onSubmit={onSignIn} />
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        <Link to={'/requestUpdatePassword'}>
          <S.LinkStyle>비밀번호가 기억나지 않아요</S.LinkStyle>
        </Link>

        <S.Hr>또는</S.Hr>

        <SocialLogin />

        <S.Message>
          계정이 없으신가요?{' '}
          <Link to={'/signup'}>
            <S.LinkStyle>회원가입</S.LinkStyle>
          </Link>
        </S.Message>
      </S.FormContainer>
    </S.Container>
  );
}

export default SignIn;

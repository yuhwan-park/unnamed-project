// dependencies
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

// components
import AuthForm from 'components/auth/AuthForm';
import SocialLogin from 'components/auth/SocialLogin';
import Loading from 'components/common/Loading';

// states
import { userState } from 'atoms';

// types
import { IFormData } from 'types';

// sources
import { auth } from 'firebase-source';

// styles
import {
  Hr,
  LinkStyle,
  ErrorMessage,
  Container,
  FormContainer,
  Message,
  Logo,
} from 'style/sign-page';

function SignUp() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const navigator = useNavigate();
  const setUserData = useSetRecoilState(userState);

  const onSignUp = async ({ email, password, nickname }: IFormData) => {
    // 이메일 로그인
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (nickname) {
        await updateProfile(userCredential.user, {
          displayName: nickname,
        });
        setUserData(obj => ({ ...obj, displayName: nickname }));
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('이미 등록된 이메일입니다.');
      }
    }
  };

  useEffect(() => {
    setIsLoggingIn(sessionStorage.length > 0);
  }, [isLoggingIn]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      // 로그인 정보가 있다면 바로 메인 페이지로
      if (user) {
        navigator('/main');
      }
    });
  }, [navigator]);

  return (
    <Container>
      {/* 구글 로그인 중일 때 보여주는 로딩 */}
      {isLoggingIn && <Loading />}

      <Link to={'/'}>
        <Logo>dail</Logo>
      </Link>

      <FormContainer>
        <AuthForm onSubmit={onSignUp} />
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Hr>또는</Hr>

        <SocialLogin />

        <Message>
          이미 계정이 있으신가요?{' '}
          <Link to={'/signin'}>
            <LinkStyle>로그인</LinkStyle>
          </Link>
        </Message>
      </FormContainer>
    </Container>
  );
}

export default SignUp;

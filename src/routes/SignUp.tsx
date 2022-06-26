import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from 'components/auth/AuthForm';
import { auth } from 'firebase-source';
import { IFormData } from 'types';
import SocialLogin from 'components/auth/SocialLogin';
import {
  Logo,
  Hr,
  LinkStyle,
  ErrorMessage,
  Container,
  FormContainer,
  Message,
  Form,
} from 'style/sign-page';
import { useSetRecoilState } from 'recoil';
import { userState } from 'atoms';
import Loading from 'components/common/Loading';

function SignUp() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const navigator = useNavigate();
  const methods = useForm<IFormData>();
  const setUserData = useSetRecoilState(userState);

  const onSubmit = async ({ email, password, nickname }: IFormData) => {
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
    if (sessionStorage.getItem('logging-in')) {
      setIsLoggingIn(true);
    }
  }, []);

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
      {isLoggingIn && <Loading />}
      <Link to={'/'}>
        <Logo draggable className="logo">
          dail
        </Logo>
      </Link>
      <FormContainer>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <AuthForm isSignUp={true} />
          </Form>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormProvider>
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

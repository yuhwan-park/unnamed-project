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

function SignUp() {
  const [error, setError] = useState('');
  const setUser = useSetRecoilState(userState);
  const navigator = useNavigate();
  const methods = useForm<IFormData>();

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
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
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
      <Logo draggable className="logo">
        dail
      </Logo>
      <FormContainer>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <AuthForm isSignUp={true} />
          </Form>
          <ErrorMessage>{error ? error : null}</ErrorMessage>
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

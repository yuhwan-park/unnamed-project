import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { auth } from '../firebase';
import { IFormData } from '../types';

function SignUp() {
  const [error, setError] = useState('');
  const navigator = useNavigate();
  const methods = useForm<IFormData>();
  const provider = new GoogleAuthProvider();
  const onClickSignUpWithGoogle = async () => {
    // 구글 로그인
    await signInWithRedirect(auth, provider);
  };
  const onSubmit = async ({ email, password, nickname }: IFormData) => {
    // 이메일 로그인
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (nickname) {
        await updateProfile(userCredential.user, { displayName: nickname });
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
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AuthForm isSignUp={true} />
        </form>
        {error ? error : null}
      </FormProvider>
      <button onClick={onClickSignUpWithGoogle}>signup with google</button>
      <div>
        이미 계정이 있으신가요? <Link to={'/signin'}>로그인</Link>
      </div>
    </>
  );
}

export default SignUp;

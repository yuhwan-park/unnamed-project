import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { auth } from '../firebase';
import { IFormData } from '../types';

function SignIn() {
  const [error, setError] = useState('');
  const navigator = useNavigate();
  const methods = useForm<IFormData>();
  const provider = new GoogleAuthProvider();

  const onClickSignInWithGoogle = async () => {
    await signInWithRedirect(auth, provider);
  };

  const onSubmit = async ({ email, password }: IFormData) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        navigator('/main');
      }
    });
  }, [navigator]);
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AuthForm isSignUp={false} />
        </form>
        {error ? error : null}
      </FormProvider>
      <Link to={'/requestUpdatePassword'}>비밀번호가 기억나지 않아요</Link>
      <button onClick={onClickSignInWithGoogle}>sign In with Google</button>
      <div>
        계정이 없으신가요? <Link to={'/signup'}>회원가입</Link>
      </div>
    </>
  );
}

export default SignIn;

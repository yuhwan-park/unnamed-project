/* eslint-disable no-useless-escape */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

interface IFormData {
  email: string;
  password: string;
}

function SignUp() {
  const [error, setError] = useState('');
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();
  const onSubmit = async ({ email, password }: IFormData) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      navigator('/main');
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email', {
            required: {
              value: true,
              message: '필수 항목입니다.',
            },
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
              message: '이메일 형식에 맞지 않습니다.',
            },
          })}
          type="text"
          placeholder="email"
        />
        {errors.email?.message ? errors.email.message : null}
        <input
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
          placeholder="password"
        />
        <input type="submit" value={'submit'} />
        {errors.password?.message ? errors.password.message : null}
      </form>
      {error ? error : null}
    </>
  );
}

export default SignUp;

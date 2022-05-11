import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { IUpdatePasswordFormData } from '../types';

function RequestUpdatePassword() {
  const [email, setEmail] = useState('');
  const { register, handleSubmit } = useForm<IUpdatePasswordFormData>();

  const onSubmitEmail = async ({ email }: IUpdatePasswordFormData) => {
    setEmail(email);
    await sendPasswordResetEmail(auth, email);
  };
  return (
    <>
      {email ? (
        <div>{email}로 메일 보냄 확인바람</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmitEmail)}>
          <input
            type="text"
            {...register('email', { required: true })}
            placeholder="email"
          />
          <input type="submit" value="비밀번호 재설정" />
        </form>
      )}
      <Link to={'/signin'}>로그인 화면으로 돌아가기</Link>
    </>
  );
}

export default RequestUpdatePassword;

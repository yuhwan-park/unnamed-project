// dependencies
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// firebase
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'firebase-source';

// styles
import * as S from './style';

interface IUpdatePasswordFormData {
  email: string;
}

function RequestUpdatePassword() {
  const [email, setEmail] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdatePasswordFormData>();

  const onSubmitEmail = async ({ email }: IUpdatePasswordFormData) => {
    setEmail(email);
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <S.Container>
      <Link to={'/'}>
        <S.Logo>dail</S.Logo>
      </Link>

      <S.EFormContainer>
        {email ? (
          <S.Paragraph>
            {email} 로 비밀번호 재설정 메일을 전송하였습니다. 확인해주세요.
          </S.Paragraph>
        ) : (
          <S.Form onSubmit={handleSubmit(onSubmitEmail)}>
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

            {errors.email && (
              <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
            )}

            <S.SubmitInput type="submit" value="메일 전송" />
          </S.Form>
        )}

        <Link to={'/signin'}>
          <S.ELinkStyle>로그인 화면으로 돌아가기</S.ELinkStyle>
        </Link>
      </S.EFormContainer>
    </S.Container>
  );
}

export default RequestUpdatePassword;

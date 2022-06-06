import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Container,
  ErrorMessage,
  Form,
  FormContainer,
  InputContainer,
  LinkStyle,
  Logo,
  SubmitInput,
  TextInput,
} from 'style/sign-page';
import { auth } from 'firebase-source';
import { IUpdatePasswordFormData } from 'types';

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
    <Container>
      <Logo draggable className="logo">
        dail
      </Logo>
      <EFormContainer>
        {email ? (
          <Message>
            {email} 로 비밀번호 재설정 메일을 전송하였습니다. 확인해주세요.
          </Message>
        ) : (
          <Form onSubmit={handleSubmit(onSubmitEmail)}>
            <InputContainer>
              <i className="fa-solid fa-envelope"></i>
              <TextInput
                type="text"
                {...register('email', {
                  required: {
                    value: true,
                    message: '필수 항목입니다.',
                  },
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
                    message: '이메일 형식에 맞지 않습니다.',
                  },
                })}
                placeholder="이메일"
              />
            </InputContainer>
            <ErrorMessage>
              {errors.email?.message ? errors.email.message : null}
            </ErrorMessage>
            <SubmitInput type="submit" value="메일 전송" />
          </Form>
        )}
        <Link to={'/signin'}>
          <ELinkStyle>로그인 화면으로 돌아가기</ELinkStyle>
        </Link>
      </EFormContainer>
    </Container>
  );
}

export default RequestUpdatePassword;

const EFormContainer = styled(FormContainer)`
  max-width: 400px;
`;

const ELinkStyle = styled(LinkStyle)`
  width: 100%;
  text-align: center;
  padding-top: 40px;
`;
const Message = styled.div`
  padding: 20px 0;
  font-size: ${props => props.theme.fontSize.medium};
  line-height: 24px;
`;

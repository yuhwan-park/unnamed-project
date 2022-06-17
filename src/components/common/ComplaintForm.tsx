import { db } from 'firebase-source';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { CancleButton, SubmitButton } from 'style/main-page';
import { ErrorMessage } from 'style/sign-page';
import styled from 'styled-components';

interface IComplaintFormProps {
  toggleFunc: (arg0: boolean) => void;
}

function ComplaintForm({ toggleFunc }: IComplaintFormProps) {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onComplaintFormSubmit = async ({ title, content }: FieldValues) => {
    const issue = { title, content };

    await addDoc(collection(db, 'Issues'), issue);
    setValue('title', '');
    setValue('content', '');
    setMessage(`'${title}' 이슈가 제출되었습니다. 감사합니다. `);
  };
  return (
    <Wrapper>
      <h2>이슈 제보</h2>
      <Message>
        버그, 혹은 개선이 필요해보이는 사항을 발견하셨다면 이 폼으로
        제보해주세요!
      </Message>
      <FormContainer onSubmit={handleSubmit(onComplaintFormSubmit)}>
        <label htmlFor="title">제목</label>
        <ComplaintInput
          type="text"
          id="title"
          {...register('title', { required: '필수 항목입니다.' })}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <label htmlFor="content">내용</label>
        <ComplaintTextArea
          id="content"
          {...register('content', { required: '필수 항목입니다.' })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
        {message && <Message>{message}</Message>}
        <FormFooter>
          <SubmitButton type="submit" value="제출" />
          <CancleButton
            type="button"
            value="취소"
            onClick={() => toggleFunc(false)}
          />
        </FormFooter>
      </FormContainer>
    </Wrapper>
  );
}

export default ComplaintForm;

const Wrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  width: 350px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 9999;
  padding: 10px 20px;
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  padding: 10px 0;
  line-height: 16px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  label {
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: 700;
    padding: 8px 0;
  }
`;

const ComplaintInput = styled.input`
  padding: 0 10px;
  border: none;
  height: 42px;
  border-radius: 6px;
  outline: none;
  background-color: rgb(244, 244, 244);
`;

const ComplaintTextArea = styled.textarea`
  padding: 10px;
  border: none;
  height: 100px;
  max-width: 400px;
  outline: none;
  background-color: rgb(244, 244, 244);
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
`;

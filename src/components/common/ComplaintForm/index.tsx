// dependencies
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
// firebase
import { db } from 'firebase-source';
import { addDoc, collection } from 'firebase/firestore';
// styles
import * as S from './style';

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
    <S.Wrapper>
      <h2>이슈 제보</h2>
      <S.Message>
        버그, 혹은 개선이 필요해보이는 사항을 발견하셨다면 이 폼으로
        제보해주세요!
      </S.Message>
      <S.FormContainer onSubmit={handleSubmit(onComplaintFormSubmit)}>
        <label htmlFor="title">제목</label>
        <S.ComplaintInput
          type="text"
          id="title"
          {...register('title', { required: '필수 항목입니다.' })}
        />
        {errors.title && (
          <S.ErrorMessage>{errors.title.message}</S.ErrorMessage>
        )}
        <label htmlFor="content">내용</label>
        <S.ComplaintTextArea
          id="content"
          {...register('content', { required: '필수 항목입니다.' })}
        />
        {errors.content && (
          <S.ErrorMessage>{errors.content.message}</S.ErrorMessage>
        )}
        {message && <S.Message>{message}</S.Message>}
        <S.FormFooter>
          <S.SubmitButton type="submit" value="제출" />
          <S.CancleButton
            type="button"
            value="취소"
            onClick={() => toggleFunc(false)}
          />
        </S.FormFooter>
      </S.FormContainer>
    </S.Wrapper>
  );
}

export default ComplaintForm;

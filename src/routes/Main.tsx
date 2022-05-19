import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import Nav from '../components/Nav';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ITaskFormData } from '../types';
import { addDoc, collection } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { dateState } from '../atoms';

function Main() {
  const [isNote, setIsNote] = useState(false);
  const date = useRecoilValue(dateState);
  const navigator = useNavigate();
  const { register, handleSubmit, setValue } = useForm<ITaskFormData>();
  const onToDoSubmit = async ({ title }: ITaskFormData) => {
    setValue('title', '');
    try {
      const user = auth.currentUser;
      if (user) {
        const colRef = collection(
          db,
          `${user.uid}/${date.format('YYYYMMDD')}/${isNote ? 'Note' : 'ToDo'}`,
        );
        await addDoc(colRef, {
          title,
          content: '',
          createdAt: Date.now(),
          isDone: false,
          isDeleted: false,
        });
      } else {
        throw new Error('Not Authorized');
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  const onSelectChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (value === 'note') {
      setIsNote(true);
    } else {
      setIsNote(false);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) {
        navigator('/');
      }
    });
  }, [navigator]);
  return (
    <>
      <Nav />
      <Container>
        <form onSubmit={handleSubmit(onToDoSubmit)}>
          <input
            type="text"
            {...register('title', { required: true })}
            placeholder="할일"
          />
        </form>
        <select onChange={onSelectChange}>
          <option value="toDo">할일</option>
          <option value="note">노트</option>
        </select>
      </Container>
    </>
  );
}

export default Main;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

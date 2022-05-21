import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import Nav from '../components/Nav';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ITaskFormData } from '../types';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { dateSelector } from '../atoms';

function Main() {
  const [todo, setTodo] = useState<DocumentData[]>([]);
  const [isNote, setIsNote] = useState(false);
  const date = useRecoilValue(dateSelector);
  const navigator = useNavigate();
  const { register, handleSubmit, setValue } = useForm<ITaskFormData>();
  const onToDoSubmit = ({ title }: ITaskFormData) => {
    setValue('title', '');
    onAuthStateChanged(auth, async user => {
      const colRef = collection(
        db,
        `${(user as User).uid}/${date}/${isNote ? 'Note' : 'ToDo'}`,
      );
      const data = {
        title,
        content: '',
        createdAt: Date.now(),
        isDone: false,
        isDeleted: false,
      };
      setTodo(prev => [...prev, data]);
      await addDoc(colRef, data);
    });
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
    onAuthStateChanged(auth, async user => {
      if (!user) {
        navigator('/');
      } else {
        const q = query(
          collection(db, user.uid, date, 'ToDo'),
          orderBy('createdAt'),
        );
        const querySnapshot = await getDocs(q);
        const arr: any = [];
        querySnapshot.forEach(doc => {
          arr.push(doc.data());
        });
        console.log('running');
        setTodo(arr);
      }
    });
  }, [date, navigator]);
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
      <div>todo</div>
      <ul>
        {todo.map(x => (
          <li key={x.createdAt}>{x.title}</li>
        ))}
      </ul>
      <hr />
      <div>note</div>
      <ul></ul>
    </>
  );
}

export default Main;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

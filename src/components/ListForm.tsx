import { onAuthStateChanged, User } from 'firebase/auth';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { dateSelector } from '../atoms';
import { auth, db } from '../firebase';
import { ITaskFormData } from '../types';

export default function ListForm() {
  const date = useRecoilValue(dateSelector);
  const [todo, setTodo] = useState<DocumentData[]>([]);
  const [isNote, setIsNote] = useState(false);
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
      const q = query(
        collection(db, (user as User).uid, date, 'ToDo'),
        orderBy('createdAt'),
      );
      const querySnapshot = await getDocs(q);
      const arr: any = [];
      querySnapshot.forEach(doc => {
        arr.push(doc.data());
      });
      console.log('running');
      setTodo(arr);
    });
  }, [date]);
  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onToDoSubmit)}>
        <input
          type="text"
          {...register('title', { required: true })}
          placeholder="할일"
        />
        <select onChange={onSelectChange}>
          <option value="toDo">할일</option>
          <option value="note">노트</option>
        </select>
      </FormContainer>

      <div>todo</div>
      <ul>
        {todo.map(x => (
          <li key={x.createdAt}>{x.title}</li>
        ))}
      </ul>
      <hr />
      <div>note</div>
      <ul></ul>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: rgb(244, 244, 244);
`;

const FormContainer = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
  }
  select {
    position: absolute;
    right: 0;
  }
`;

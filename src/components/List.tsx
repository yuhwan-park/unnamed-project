import { onAuthStateChanged, User } from 'firebase/auth';
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { dateSelector, noteState, todoState } from '../atoms';
import { auth, db } from '../firebase';
import { ITaskFormData } from '../types';
import Note from './Note';
import ToDo from './ToDo';

export default function List() {
  const date = useRecoilValue(dateSelector);
  const [todos, setTodos] = useRecoilState(todoState);
  const [notes, setNotes] = useRecoilState(noteState);
  const [isNote, setIsNote] = useState(false);
  const { register, handleSubmit, setValue } = useForm<ITaskFormData>();

  const onToDoSubmit = ({ title }: ITaskFormData) => {
    setValue('title', '');
    onAuthStateChanged(auth, async user => {
      const docRef = doc(
        collection(db, `${(user as User).uid}/${date}/Document`),
      );
      const data = {
        id: docRef.id,
        title,
        content: '',
        createdAt: Date.now(),
        isDone: false,
        isDeleted: false,
        isNote,
      };
      if (isNote) {
        setNotes(prev => [...prev, data]);
      } else {
        setTodos(prev => [...prev, data]);
      }
      await setDoc(docRef, data);
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
      const noteQuery = query(
        collection(db, (user as User).uid, date, 'Document'),
        orderBy('createdAt'),
        where('isNote', '==', true),
      );
      const todoQuery = query(
        collection(db, (user as User).uid, date, 'Document'),
        orderBy('createdAt'),
        where('isNote', '==', false),
      );
      const querySnapshot = await Promise.all([
        getDocs(todoQuery),
        getDocs(noteQuery),
      ]);
      const todoArr: DocumentData[] = [];
      querySnapshot[0].forEach(doc => {
        todoArr.push(doc.data());
      });
      const noteArr: DocumentData[] = [];
      querySnapshot[1].forEach(doc => {
        noteArr.push(doc.data());
      });
      setTodos(todoArr);
      setNotes(noteArr);
    });
  }, [date, setNotes, setTodos]);
  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit(onToDoSubmit)}>
        <input
          type="text"
          {...register('title', { required: true })}
          placeholder="할 일을 추가해보세요."
        />
        <select onChange={onSelectChange}>
          <option value="toDo">할일</option>
          <option value="note">노트</option>
        </select>
      </FormContainer>

      <ListContainer>
        {todos.length ? (
          <>
            <Title>할일</Title>
            <ul>
              {todos.map(
                todo =>
                  !todo.isDone && <ToDo key={todo.createdAt} todo={todo} />,
              )}
            </ul>
            <Title>완료</Title>
            <ul>
              {todos.map(
                todo =>
                  todo.isDone && <ToDo key={todo.createdAt} todo={todo} />,
              )}
            </ul>
            <hr />
          </>
        ) : null}
        {notes.length ? (
          <>
            <Title>노트</Title>
            <ul>
              {notes.map(note => (
                <Note key={note.createdAt} note={note}>
                  {note.title}
                </Note>
              ))}
            </ul>
          </>
        ) : null}
        {!todos.length && !notes.length && <h1>오늘은 할일이 없습니다!</h1>}
      </ListContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const FormContainer = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    border: none;
    border-radius: 6px;
    outline: none;
    background-color: rgb(244, 244, 244);
  }
  select {
    position: absolute;
    right: 0;
    border: none;
    border-left: 1px solid #bbb;
    border-radius: 6px;
    height: 100%;
    outline: none;
    background-color: rgb(244, 244, 244);
  }
`;

const ListContainer = styled.div`
  padding: 10px;
  background-color: rgb(244, 244, 244);
  border-radius: 6px;
`;

const Title = styled.div`
  padding: 8px 0;
  font-weight: 600;
`;

import { onAuthStateChanged, User } from 'firebase/auth';
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  dateSelector,
  documentState,
  doingTodoState,
  doneTodoState,
  noteState,
} from '../atoms';
import { auth, db } from '../firebase';
import { ITaskFormData } from '../types';
import Note from './Note';
import ToDo from './ToDo';

export default function List() {
  const date = useRecoilValue(dateSelector);
  const doingTodo = useRecoilValue(doingTodoState);
  const doneTodo = useRecoilValue(doneTodoState);
  const notes = useRecoilValue(noteState);
  const [documents, setDocuments] = useRecoilState(documentState);
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
        createdAt: Timestamp.fromDate(new Date()),
        isDone: false,
        isDeleted: false,
        isNote,
      };
      setDocuments(prev => [...prev, data]);
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
      const docQurey = query(
        collection(db, (user as User).uid, date, 'Document'),
        orderBy('createdAt'),
      );
      const querySnapshot = await getDocs(docQurey);

      const tempArray: DocumentData[] = [];
      querySnapshot.forEach(doc => {
        tempArray.push(doc.data());
      });
      setDocuments(tempArray);
    });
  }, [date, setDocuments]);
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
        {doingTodo.length ? (
          <ul>
            <Title>할일</Title>
            {doingTodo.map(todo => (
              <ToDo key={todo.id} todo={todo} />
            ))}
          </ul>
        ) : null}

        {doneTodo.length ? (
          <ul>
            <Title>완료</Title>
            {doneTodo.map(todo => (
              <ToDo key={todo.id} todo={todo} />
            ))}
          </ul>
        ) : null}

        {notes.length ? (
          <>
            <ul>
              <Title>노트</Title>
              {notes.map(note => (
                <Note key={note.id} note={note} />
              ))}
            </ul>
          </>
        ) : null}

        {!documents.length && <h1>오늘은 할일이 없습니다!</h1>}
      </ListContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
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
  ul {
    border-bottom: 1px solid #bbb;
    &:last-child {
      border: none;
    }
  }
`;

const Title = styled.div`
  padding: 8px 0;
  font-weight: 600;
`;

import { onAuthStateChanged, User } from 'firebase/auth';
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  dateSelector,
  documentState,
  doingTodoState,
  doneTodoState,
  noteState,
  selectedListState,
} from 'atoms';
import { auth, db } from 'firebase-source';
import NoteItem from 'components/list/NoteItem';
import TodoItem from 'components/list/TodoItem';
import ContentForm from 'components/list/ContentForm';

export default function List() {
  const date = useRecoilValue(dateSelector);
  const doingTodo = useRecoilValue(doingTodoState);
  const doneTodo = useRecoilValue(doneTodoState);
  const notes = useRecoilValue(noteState);
  const myLists = useRecoilValue(selectedListState);
  const [documents, setDocuments] = useRecoilState(documentState);
  console.log(myLists);
  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
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
      }
    });
  }, [date, setDocuments]);
  return (
    <Wrapper>
      <ContentForm />

      <ListContainer>
        {Boolean(doingTodo.length) && (
          <ul>
            <Title>할일</Title>
            {doingTodo.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}

        {Boolean(doneTodo.length) && (
          <ul>
            <Title>완료</Title>
            {doneTodo.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}

        {Boolean(notes.length) && (
          <ul>
            <Title>노트</Title>
            {notes.map(note => (
              <NoteItem key={note.id} note={note} />
            ))}
          </ul>
        )}

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

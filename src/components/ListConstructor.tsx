import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NoteItem from './list/NoteItem';
import TodoItem from './list/TodoItem';

interface IListConstructorProps {
  documentData: DocumentData[];
}

function ListConstructor({ documentData }: IListConstructorProps) {
  const [doingTodo, setDoingTodo] = useState<DocumentData[]>([]);
  const [doneTodo, setDoneTodo] = useState<DocumentData[]>([]);
  const [notes, setNotes] = useState<DocumentData[]>([]);

  useEffect(() => {
    const doingTodosData = documentData.filter(
      document => !document.isDone && !document.isNote,
    );
    const doneTodosData = documentData.filter(
      document => document.isDone && !document.isNote,
    );
    const notesData = documentData.filter(document => document.isNote);
    setDoingTodo(doingTodosData.sort((a, b) => a.priority - b.priority));
    setDoneTodo(doneTodosData);
    setNotes(notesData);
  }, [documentData]);
  return (
    <>
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
      {!documentData.length && <h1>오늘은 할일이 없습니다!</h1>}
    </>
  );
}

export default ListConstructor;

const Title = styled.div`
  padding: 8px 0;
  font-weight: 600;
`;

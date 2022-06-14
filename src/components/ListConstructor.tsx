import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { IDocument } from 'types';
import NoteItem from './list/NoteItem';
import TodoItem from './list/TodoItem';
import { ListHeader } from 'style/main-page';
import styled from 'styled-components';

interface IListConstructorProps {
  documentData: IDocument[];
}

function ListConstructor({ documentData }: IListConstructorProps) {
  const [doingTodo, setDoingTodo] = useState<IDocument[]>([]);
  const [doneTodo, setDoneTodo] = useState<IDocument[]>([]);
  const [notes, setNotes] = useState<IDocument[]>([]);
  const [collapseDoingToDo, setCollapseDoingToDo] = useState(true);
  const [collapseDoneToDo, setCollapseDoneToDo] = useState(true);
  const [collapsenotes, setCollapsenotes] = useState(true);

  const onClickListHeader = (type: string) => {
    switch (type) {
      case 'doing':
        setCollapseDoingToDo(prev => !prev);
        break;
      case 'done':
        setCollapseDoneToDo(prev => !prev);
        break;
      case 'note':
        setCollapsenotes(prev => !prev);
        break;
      default:
        break;
    }
  };

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
    <Wrapper>
      {Boolean(doingTodo.length) && (
        <ul>
          <ListHeader
            isCollapsed={collapseDoingToDo}
            onClick={() => onClickListHeader('doing')}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              size="sm"
              className="toggle-menu-icon"
            />
            <h2>할일 {`(${doingTodo.length})`}</h2>
          </ListHeader>
          {collapseDoingToDo &&
            doingTodo.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </ul>
      )}

      {Boolean(doneTodo.length) && (
        <ul>
          <ListHeader
            isCollapsed={collapseDoneToDo}
            onClick={() => onClickListHeader('done')}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              size="sm"
              className="toggle-menu-icon"
            />
            <h2>완료 {`(${doneTodo.length})`}</h2>
          </ListHeader>
          {collapseDoneToDo &&
            doneTodo.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </ul>
      )}

      {Boolean(notes.length) && (
        <ul>
          <ListHeader
            isCollapsed={collapsenotes}
            onClick={() => onClickListHeader('note')}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              size="sm"
              className="toggle-menu-icon"
            />
            <h2>노트 {`(${notes.length})`}</h2>
          </ListHeader>
          {collapsenotes &&
            notes.map(note => <NoteItem key={note.id} note={note} />)}
        </ul>
      )}
      {!documentData.length && (
        <EmptyContent>
          <h1>할 일이 없어요 😗</h1>
          <div>해야할 일을 추가하거나 일기를 기록해 보세요!</div>
        </EmptyContent>
      )}
    </Wrapper>
  );
}

export default ListConstructor;

const Wrapper = styled.div`
  height: 100%;
`;
const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  h1 {
    font-size: 24px;
    padding: 20px 0;
  }
  div {
    font-size: ${props => props.theme.fontSize.medium};
  }
`;

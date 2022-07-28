import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { memo, useEffect, useState } from 'react';
import { IDocument } from 'types';
import ListItem from './ListItem';
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
  const [collapseNotes, setCollapseNotes] = useState(true);

  const onClickListHeader = (type: string) => {
    switch (type) {
      case 'doing':
        setCollapseDoingToDo(prev => !prev);
        break;
      case 'done':
        setCollapseDoneToDo(prev => !prev);
        break;
      case 'note':
        setCollapseNotes(prev => !prev);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const doingTodosData: IDocument[] = [];
    const doneTodosData: IDocument[] = [];
    const notesData: IDocument[] = [];
    documentData.forEach(document => {
      if (document.isNote) notesData.push(document);
      else if (document.isDone) doneTodosData.push(document);
      else doingTodosData.push(document);
    });
    setDoingTodo(doingTodosData.sort((a, b) => a.priority - b.priority));
    setDoneTodo(doneTodosData);
    setNotes(notesData);
  }, [documentData]);

  return (
    <Wrapper>
      {doingTodo.length > 0 && (
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
            doingTodo.map(todo => <ListItem key={todo.id} item={todo} />)}
        </ul>
      )}

      {doneTodo.length > 0 && (
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
            doneTodo.map(todo => <ListItem key={todo.id} item={todo} />)}
        </ul>
      )}

      {notes.length > 0 && (
        <ul>
          <ListHeader
            isCollapsed={collapseNotes}
            onClick={() => onClickListHeader('note')}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              size="sm"
              className="toggle-menu-icon"
            />
            <h2>노트 {`(${notes.length})`}</h2>
          </ListHeader>
          {collapseNotes &&
            notes.map(note => <ListItem key={note.id} item={note} />)}
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

export default memo(ListConstructor);

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

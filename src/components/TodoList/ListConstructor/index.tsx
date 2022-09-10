// dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { memo, useEffect, useState } from 'react';
// components
import ListItem from '../ListItem';
// types
import { Document } from '@types';
// styles
import * as S from './style';

interface IListConstructorProps {
  documentData: Document[];
}

function ListConstructor({ documentData }: IListConstructorProps) {
  const [doingTodo, setDoingTodo] = useState<Document[]>([]);
  const [doneTodo, setDoneTodo] = useState<Document[]>([]);
  const [notes, setNotes] = useState<Document[]>([]);
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
    const doingTodosData: Document[] = [];
    const doneTodosData: Document[] = [];
    const notesData: Document[] = [];
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
    <S.Wrapper>
      {doingTodo.length > 0 && (
        <ul>
          <S.ListHeader
            isCollapsed={collapseDoingToDo}
            onClick={() => onClickListHeader('doing')}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              size="sm"
              className="toggle-menu-icon"
            />
            <h2>할일 {`(${doingTodo.length})`}</h2>
          </S.ListHeader>
          {collapseDoingToDo &&
            doingTodo.map(todo => <ListItem key={todo.id} item={todo} />)}
        </ul>
      )}

      {doneTodo.length > 0 && (
        <ul>
          <S.ListHeader
            isCollapsed={collapseDoneToDo}
            onClick={() => onClickListHeader('done')}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              size="sm"
              className="toggle-menu-icon"
            />
            <h2>완료 {`(${doneTodo.length})`}</h2>
          </S.ListHeader>
          {collapseDoneToDo &&
            doneTodo.map(todo => <ListItem key={todo.id} item={todo} />)}
        </ul>
      )}

      {notes.length > 0 && (
        <ul>
          <S.ListHeader
            isCollapsed={collapseNotes}
            onClick={() => onClickListHeader('note')}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              size="sm"
              className="toggle-menu-icon"
            />
            <h2>노트 {`(${notes.length})`}</h2>
          </S.ListHeader>
          {collapseNotes &&
            notes.map(note => <ListItem key={note.id} item={note} />)}
        </ul>
      )}

      {!documentData.length && (
        <S.EmptyContent>
          <h1>할 일이 없어요 😗</h1>
          <div>해야할 일을 추가하거나 일기를 기록해 보세요!</div>
        </S.EmptyContent>
      )}
    </S.Wrapper>
  );
}

export default memo(ListConstructor);

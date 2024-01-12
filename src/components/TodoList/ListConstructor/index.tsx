import { Document } from '@types';
import CollapsibleList from 'components/common/CollapsibleList';
import ListItem from '../ListItem';
import * as S from './style';

interface IListConstructorProps {
  documentData: Document[];
}

function ListConstructor({ documentData }: IListConstructorProps) {
  const { doingTodo, doneTodo, notes } = documentData.reduce(
    (acc, document) => {
      if (!document) return acc;
      if (document.isNote) acc.notes.push(document);
      else if (document.isDone) acc.doneTodo.push(document);
      else acc.doingTodo.push(document);
      return acc;
    },
    { doingTodo: [], doneTodo: [], notes: [] } as {
      doingTodo: Document[];
      doneTodo: Document[];
      notes: Document[];
    },
  );

  return (
    <S.Wrapper>
      {doingTodo.length > 0 && (
        <CollapsibleList title={`할일 (${doingTodo.length})`}>
          {doingTodo.map(todo => (
            <ListItem key={todo.id} item={todo} />
          ))}
        </CollapsibleList>
      )}

      {doneTodo.length > 0 && (
        <CollapsibleList title={`완료 (${doneTodo.length})`}>
          {doneTodo.map(todo => (
            <ListItem key={todo.id} item={todo} />
          ))}
        </CollapsibleList>
      )}

      {notes.length > 0 && (
        <CollapsibleList title={`노트 (${notes.length})`}>
          {notes.map(todo => (
            <ListItem key={todo.id} item={todo} />
          ))}
        </CollapsibleList>
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

export default ListConstructor;

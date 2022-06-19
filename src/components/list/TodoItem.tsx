import React from 'react';
import { setDoc, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  useGetAllDocRef,
  useGetDocRef,
  useGetListDocRef,
  useUpdateDocs,
} from 'hooks';
import { ListItemContainer, Title } from 'style/main-page';
import ListMenu from './ListMenu';
import CheckBox from 'components/common/CheckBox';
import { IDocument } from 'types';
import ListIcons from './ListIcons';
import { useRecoilValue } from 'recoil';
import { selectedListState } from 'atoms';

interface ITodoItemProps {
  todo: IDocument;
}

function TodoItem({ todo }: ITodoItemProps) {
  const updator = useUpdateDocs();
  const docRef = useGetDocRef(todo);
  const ListDocRef = useGetListDocRef(todo);
  const allDocRef = useGetAllDocRef();
  const navigator = useNavigate();
  const { register } = useForm();
  const selectedList = useRecoilValue(selectedListState);
  const { pathname } = useLocation();

  const onClickList = () => {
    if (todo.list && selectedList) {
      navigator(`/main/lists/${todo.list.id}/tasks/${todo.id}`);
    } else if (pathname.includes('all')) {
      navigator(`/main/all/tasks/${todo.id}`);
    } else {
      navigator(`/main/${todo.id}`);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updator(todo, 'title', e.currentTarget.value, false);
  };

  const onBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    if (ListDocRef) {
      await updateDoc(ListDocRef, { title });
    }
    if (docRef) {
      await updateDoc(docRef, { title });
    }
    if (allDocRef) {
      await setDoc(
        allDocRef,
        { docMap: { [todo.id]: { ...todo, title } } },
        { merge: true },
      );
    }
  };
  return (
    <>
      <ListItemContainer>
        <CheckBox todo={todo} />
        <ToDoTitle
          className="show-editor-trigger"
          type="text"
          isDone={todo.isDone}
          defaultValue={todo.title}
          onClick={onClickList}
          spellCheck={false}
          {...register(`todoTitle-${todo.id}`, {
            onBlur,
            onChange,
          })}
        />
        <ListIcons item={todo} />
        <ListMenu item={todo} isEditor={false} />
      </ListItemContainer>
    </>
  );
}

export default TodoItem;

const ToDoTitle = styled(Title)<{ isDone: boolean }>`
  color: ${props => (props.isDone ? '#bbb' : 'black')};
`;

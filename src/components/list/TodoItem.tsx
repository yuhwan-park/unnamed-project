import React from 'react';
import { updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { selectedListState } from 'atoms';
import { useGetDocRef, useGetListDocRef, useUpdateDocs } from 'hooks';
import { ListItemContainer, Title } from 'style/main-page';
import ListMenu from './ListMenu';
import CheckBox from 'components/common/CheckBox';
import { IDocument } from 'types';

interface ITodoItemProps {
  todo: IDocument;
}

function TodoItem({ todo }: ITodoItemProps) {
  const updator = useUpdateDocs();
  const myList = useRecoilValue(selectedListState);
  const docRef = useGetDocRef(todo.id);
  const ListDocRef = useGetListDocRef(myList?.id, todo.id);
  const navigator = useNavigate();
  const { register } = useForm();

  const onClickList = () => {
    if (myList) {
      navigator(`/main/lists/${myList.id}/tasks/${todo.id}`);
    } else {
      navigator(`/main/${todo.id}`);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updator(todo.id, 'title', e.currentTarget.value);
  };

  const onBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (myList) {
      if (ListDocRef)
        await updateDoc(ListDocRef, { title: e.currentTarget.value });
    } else {
      if (docRef) await updateDoc(docRef, { title: e.currentTarget.value });
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
        <ListMenu item={todo} isEditor={false} />
      </ListItemContainer>
    </>
  );
}

export default React.memo(TodoItem);

const ToDoTitle = styled(Title)<{ isDone: boolean }>`
  color: ${props => (props.isDone ? '#bbb' : 'black')};
`;

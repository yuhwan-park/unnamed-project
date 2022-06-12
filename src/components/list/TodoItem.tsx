import React from 'react';
import { DocumentData, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { selectedListState } from 'atoms';
import { useGetDocRef, useGetListDocRef, useUpdateDocs } from 'hooks';
import { ListItemContainer, Title } from 'style/main-page';
import ListMenu from './ListMenu';
import CheckBox from 'components/common/CheckBox';

interface ITodoItemProps {
  todo: DocumentData;
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

  const onChange = (e: any) => {
    updator(todo.id, 'title', e.target.value);
  };

  const onBlur = async (e: any) => {
    if (myList) {
      if (ListDocRef) await updateDoc(ListDocRef, { title: e.target.value });
    } else {
      if (docRef) await updateDoc(docRef, { title: e.target.value });
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

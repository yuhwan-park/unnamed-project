import React from 'react';
import { DocumentData, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { selectedListState } from 'atoms';
import { useGetDocRef, useGetListDocRef, useUpdateDocs } from 'hooks';
import { IconContainer, ListItemContainer, Title } from 'style/main-page';
import ListMenu from './ListMenu';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  const onClickCheckBox = async () => {
    updator(todo.id, 'isDone', !todo.isDone);
    if (myList) {
      if (ListDocRef) await updateDoc(ListDocRef, { isDone: !todo.isDone });
    } else {
      if (docRef) await updateDoc(docRef, { isDone: !todo.isDone });
    }
  };

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
        <IconContainer className="show-editor-trigger">
          <CheckBox
            className="check-box"
            onClick={onClickCheckBox}
            isDone={todo.isDone}
            priority={todo.priority}
          >
            {todo.isDone ? <FontAwesomeIcon icon={faCheck} inverse /> : null}
          </CheckBox>
        </IconContainer>
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
        <ListMenu item={todo} />
      </ListItemContainer>
    </>
  );
}

export default React.memo(TodoItem);

const CheckBox = styled.div<{ isDone: boolean; priority: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: ${props =>
    props.isDone
      ? 'none'
      : props.priority === 1
      ? '2px solid red'
      : props.priority === 2
      ? '2px solid blue'
      : props.priority === 3
      ? '2px solid green'
      : '2px solid rgba(0, 0, 0, 0.1)'};
  z-index: 1;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props =>
    props.isDone ? 'rgba(0, 0, 0, 0.2)' : 'transparent'};
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const ToDoTitle = styled(Title)<{ isDone: boolean }>`
  color: ${props => (props.isDone ? '#bbb' : 'black')};
`;

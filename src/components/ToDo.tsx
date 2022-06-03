import React from 'react';
import { DocumentData, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { documentState } from '../atoms';
import { useGetDocRef } from '../hooks';
import { List, Title } from '../style/main-page';
import ListMenu from './ListMenu';

function ToDo({ todo }: DocumentData) {
  const setDocument = useSetRecoilState(documentState);
  const docRef = useGetDocRef(todo.id);
  const navigator = useNavigate();
  const { register, setValue } = useFormContext();

  const onClickCheckBox = async () => {
    setDocument(todos =>
      todos.map(value =>
        value.id === todo.id ? { ...value, isDone: !todo.isDone } : value,
      ),
    );
    if (docRef) await setDoc(docRef, { isDone: !todo.isDone }, { merge: true });
  };

  const onClickList = () => {
    navigator(`/main/${todo.id}`);
  };

  const onChange = (e: any) => {
    setDocument(todos =>
      todos.map(value =>
        value.id === todo.id ? { ...value, title: e.target.value } : value,
      ),
    );
  };

  const onBlur = async (e: any) => {
    if (docRef)
      await setDoc(docRef, { title: e.target.value }, { merge: true });
  };

  useEffect(() => {
    setValue(`todoTitle-${todo.id}`, todo.title);
  }, [setValue, todo]);
  return (
    <>
      <List onClick={onClickList} className="show-editor-trigger">
        <CheckBoxContainer>
          <CheckBox
            className="check-box"
            onClick={onClickCheckBox}
            isDone={todo.isDone}
          >
            {todo.isDone ? <i className="fa-solid fa-check"></i> : null}
          </CheckBox>
        </CheckBoxContainer>

        <ToDoTitle
          type="text"
          isDone={todo.isDone}
          defaultValue={todo.title}
          {...register(`todoTitle-${todo.id}`, {
            onBlur,
            onChange,
          })}
        />

        <ListMenu document={todo} />
      </List>
    </>
  );
}

export default React.memo(ToDo);

const CheckBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
`;

const CheckBox = styled.div<{ isDone: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: ${props => (props.isDone ? 'none' : '2px solid rgba(0,0,0,0.2)')};
  z-index: 1;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props =>
    props.isDone ? 'rgba(0, 0, 0, 0.2)' : 'transparent'};
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  i {
    color: white;
  }
`;

const ToDoTitle = styled(Title)<{ isDone: boolean }>`
  color: ${props => (props.isDone ? '#bbb' : 'black')};
`;

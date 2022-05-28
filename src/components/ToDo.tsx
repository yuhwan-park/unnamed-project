import { User } from 'firebase/auth';
import { doc, DocumentData, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { dateSelector, todoState } from '../atoms';
import { auth, db } from '../firebase';
import { List, Title } from '../defaultStyle/main-page';
import ListMenu from './ListMenu';
import { setTitle } from '../hooks';

export default function ToDo({ todo }: DocumentData) {
  const setTodos = useSetRecoilState(todoState);
  const navigator = useNavigate();
  const { register } = useForm({
    mode: 'onBlur',
  });
  const date = useRecoilValue(dateSelector);
  const docRef = doc(
    db,
    `${(auth.currentUser as User).uid}/${date}/Document/${todo.id}`,
  );

  const onClickCheckBox = async () => {
    setTodos(todos =>
      todos.map(t => (t.id === todo.id ? { ...t, isDone: !todo.isDone } : t)),
    );

    await setDoc(docRef, { isDone: !todo.isDone }, { merge: true });
  };

  const onClickList = () => {
    navigator(`/main/${todo.id}`);
  };

  const onBlur = async (e: any) => {
    await setTitle(docRef, e);
  };
  return (
    <>
      <List onClick={onClickList}>
        <Overlay check={todo.isDone} />
        <CheckBoxContainer>
          <CheckBox onClick={onClickCheckBox} check={todo.isDone}>
            {todo.isDone ? <i className="fa-solid fa-check"></i> : null}
          </CheckBox>
        </CheckBoxContainer>

        <Title
          type="text"
          defaultValue={todo.title}
          {...register('todoTitle', {
            onBlur,
          })}
        />

        <ListMenu document={todo} />
      </List>
    </>
  );
}

const Overlay = styled.div<{ check: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: ${props => (props.check ? 'block' : 'none')};
`;

const CheckBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
`;

const CheckBox = styled.div<{ check: boolean }>`
  text-align: center;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  z-index: 1;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props =>
    props.check ? 'rgba(0, 0, 0, 0.2)' : 'transparent'};
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  i {
    color: white;
  }
`;

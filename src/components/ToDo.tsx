import { User } from 'firebase/auth';
import { doc, DocumentData, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { dateSelector, todoState } from '../atoms';
import { auth, db } from '../firebase';
import { List, Title } from '../style/main-page';
import ListMenu from './ListMenu';
import { setTitle } from '../utils';

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
      todos.map(value =>
        value.id === todo.id ? { ...value, isDone: !todo.isDone } : value,
      ),
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
          {...register('todoTitle', {
            onBlur,
          })}
        />

        <ListMenu document={todo} />
      </List>
    </>
  );
}

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

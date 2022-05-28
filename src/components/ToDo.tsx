import { User } from 'firebase/auth';
import { doc, DocumentData, setDoc } from 'firebase/firestore';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { dateSelector, todoState } from '../atoms';
import { auth, db } from '../firebase';
import ListMenu from './ListMenu';

export default function ToDo({ todo }: DocumentData) {
  const setTodos = useSetRecoilState(todoState);
  const date = useRecoilValue(dateSelector);
  const onClickCheckBox = async () => {
    setTodos(todos =>
      todos.map(t => (t.id === todo.id ? { ...t, isDone: !todo.isDone } : t)),
    );
    const docRef = doc(
      db,
      `${(auth.currentUser as User).uid}/${date}/Document/${todo.id}`,
    );
    await setDoc(docRef, { isDone: !todo.isDone }, { merge: true });
  };
  return (
    <>
      <List>
        <Overlay check={todo.isDone} />
        <CheckBoxContainer>
          <CheckBox onClick={onClickCheckBox} check={todo.isDone}>
            {todo.isDone ? <i className="fa-solid fa-check"></i> : null}
          </CheckBox>
        </CheckBoxContainer>
        <span>{todo.title}</span>
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

const List = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  margin-bottom: 6px;
  cursor: pointer;
  &:hover {
    .fa-ellipsis {
      opacity: 1;
    }
  }
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

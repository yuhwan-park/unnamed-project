import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { updateDoc } from 'firebase/firestore';
import { IconContainer } from 'style/main-page';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useGetDocRef, useGetListDocRef, useUpdateDocs } from 'hooks';
import { selectedListState } from 'atoms';
import { IDocument } from 'types';

interface ICheckBoxProps {
  todo: IDocument;
}

function CheckBox({ todo }: ICheckBoxProps) {
  const updator = useUpdateDocs();
  const myList = useRecoilValue(selectedListState);
  const docRef = useGetDocRef(todo.id);
  const ListDocRef = useGetListDocRef(myList?.id, todo.id);

  const onClickCheckBox = async () => {
    updator(todo.id, 'isDone', !todo.isDone);
    if (myList) {
      if (ListDocRef) await updateDoc(ListDocRef, { isDone: !todo.isDone });
    } else {
      if (docRef) await updateDoc(docRef, { isDone: !todo.isDone });
    }
  };

  return (
    <IconContainer className="show-editor-trigger">
      <CheckBoxContainer
        className="check-box"
        onClick={onClickCheckBox}
        isDone={todo.isDone}
        priority={todo.priority}
      >
        {todo.isDone ? <FontAwesomeIcon icon={faCheck} inverse /> : null}
      </CheckBoxContainer>
    </IconContainer>
  );
}

export default CheckBox;

const CheckBoxContainer = styled.div<{ isDone: boolean; priority: number }>`
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

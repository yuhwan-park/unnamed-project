import { deleteDoc, DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { documentState } from '../atoms';
import { useGetDocRef } from '../hooks';

export default function ListMenu({ document }: DocumentData) {
  const setDocument = useSetRecoilState(documentState);
  const docRef = useGetDocRef(document.id);
  const [menu, setMenu] = useState(false);
  const onClickDelete = async () => {
    setDocument(todos => todos.filter(todo => document.id !== todo.id));
    await deleteDoc(docRef);
  };
  const onMouseEnterIntoMenu = () => {
    setMenu(true);
  };
  const onMouseLeaveFromMenu = () => {
    setMenu(false);
  };
  return (
    <MenuContainer
      onMouseEnter={onMouseEnterIntoMenu}
      onMouseLeave={onMouseLeaveFromMenu}
    >
      <MenuIcon className="fa-solid fa-ellipsis"></MenuIcon>
      {menu ? (
        <Modal>
          <MenuButton onClick={onClickDelete}>
            <i className="fa-solid fa-trash-can"></i>
            <span>삭제하기</span>
          </MenuButton>
        </Modal>
      ) : null}
    </MenuContainer>
  );
}
const MenuContainer = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
`;

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px;
  cursor: pointer;
  span {
    font-size: ${props => props.theme.fontSize.medium};
  }
  i {
    color: #bbb;
    padding-right: 10px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const Modal = styled.div`
  position: absolute;
  right: -30px;
  width: 200px;
  height: 300px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 1;
  cursor: auto;
`;

const MenuIcon = styled.i`
  position: relative;
  right: 10px;
  opacity: 0;
  color: rgba(0, 0, 0, 0.3);
  &:hover {
    color: rgba(0, 0, 0, 0.6);
  }
`;

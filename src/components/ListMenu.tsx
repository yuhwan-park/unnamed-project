import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteDoc, DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { documentState } from '../atoms';
import { useGetDocRef } from '../hooks';
import {
  faTrashCan,
  faEllipsis,
  faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

export default function ListMenu({ document }: DocumentData) {
  const setDocument = useSetRecoilState(documentState);
  const navigator = useNavigate();
  const docRef = useGetDocRef(document.id);
  const [menu, setMenu] = useState(false);
  const onClickDelete = async () => {
    setDocument(todos => todos.filter(todo => document.id !== todo.id));
    if (docRef) await deleteDoc(docRef);
    navigator('/main');
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
      <FontAwesomeIcon icon={faEllipsis} className="toggle-menu" />
      {menu ? (
        <Modal>
          <MenuButton onClick={onClickDelete}>
            <FontAwesomeIcon icon={faTrashCan} className="sub-icon" />
            <span>삭제하기</span>
          </MenuButton>
          <MenuButton>
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              className="sub-icon"
            />
            <span>{document.isNote ? '할일로 변환' : '노트로 변환'}</span>
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
  .toggle-menu {
    position: relative;
    right: 10px;
    opacity: 0;
    color: rgba(0, 0, 0, 0.3);
    &:hover {
      color: rgba(0, 0, 0, 0.6);
    }
  }
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
  .sub-icon {
    color: #bbb;
    width: 20px;
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

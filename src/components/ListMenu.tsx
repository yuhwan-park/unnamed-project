import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteDoc, DocumentData, setDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
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

export default function ListMenu({ item }: DocumentData) {
  const setDocument = useSetRecoilState(documentState);
  const navigator = useNavigate();
  const menuRef = useRef(null);
  const docRef = useGetDocRef(item.id);
  const [isOpen, setIsOpen] = useState(false);

  const onClickMenu = () => {
    setIsOpen(prev => !prev);
  };

  const onClickDelete = async () => {
    setDocument(todos => todos.filter(todo => item.id !== todo.id));
    if (docRef) await deleteDoc(docRef);
    navigator('/main');
  };

  const onClickConvert = async () => {
    setDocument(docs =>
      docs.map(value =>
        value.id === item.id ? { ...value, isNote: !item.isNote } : value,
      ),
    );
    if (docRef) await setDoc(docRef, { isNote: !item.isNote }, { merge: true });
  };

  useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLDivElement).contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => document.removeEventListener('mousedown', handleClickOutSide);
  });

  return (
    <MenuContainer onClick={onClickMenu} ref={menuRef}>
      <FontAwesomeIcon icon={faEllipsis} className="toggle-menu-icon" />
      {isOpen ? (
        <Modal>
          <MenuButton onClick={onClickDelete}>
            <FontAwesomeIcon icon={faTrashCan} className="sub-icon" />
            <span>삭제하기</span>
          </MenuButton>
          <MenuButton onClick={onClickConvert}>
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              className="sub-icon"
            />
            <span>{item.isNote ? '할일로 변환' : '노트로 변환'}</span>
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
  .toggle-menu-icon {
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
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  span {
    font-size: ${props => props.theme.fontSize.medium};
  }
  .sub-icon {
    color: #bbb;
    width: 20px;
    padding-right: 10px;
  }
`;

const Modal = styled.div`
  position: absolute;
  right: -30px;
  width: 200px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

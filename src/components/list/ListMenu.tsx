import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteDoc, DocumentData, setDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { documentState } from 'atoms';
import { useGetDocRef } from 'hooks';
import {
  faTrashCan,
  faEllipsis,
  faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { MenuButtonContainer, MenuContainer, MenuModal } from 'style/main-page';

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
  }, []);

  return (
    <MenuContainer onClick={onClickMenu} ref={menuRef}>
      <FontAwesomeIcon icon={faEllipsis} className="toggle-menu-icon" />
      {isOpen ? (
        <MenuModal>
          <MenuButtonContainer onClick={onClickDelete}>
            <FontAwesomeIcon icon={faTrashCan} className="sub-icon" />
            <span>삭제하기</span>
          </MenuButtonContainer>

          <MenuButtonContainer onClick={onClickConvert}>
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              className="sub-icon"
            />
            <span>{item.isNote ? '할일로 변환' : '노트로 변환'}</span>
          </MenuButtonContainer>
        </MenuModal>
      ) : null}
    </MenuContainer>
  );
}

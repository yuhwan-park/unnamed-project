// dependencies
import {
  faTrashCan,
  faEllipsis,
  faArrowRightArrowLeft,
  faListUl,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
// components
import PriorityFlag from 'components/common/PriorityFlag';
import MoveListModal from '../MoveListModal';
// states
import { allDocumentState, docIdsByDate } from 'atoms';
// firebase
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from 'firebase-source';
// hooks
import { useUpdateTodo, useDetectClickOutside, useSetDocCount } from 'hooks';
// types
import { IDocument } from 'types';
// styles
import * as S from './style';

interface IListMenu {
  item: IDocument;
  isEditor: boolean;
}

function ListMenu({ item, isEditor }: IListMenu) {
  const [isOpen, setIsOpen] = useState(false);
  const [moveListFlag, setMoveListFlag] = useState(false);
  const [allDocument, setAllDocument] = useRecoilState(allDocumentState);
  const setDocIds = useSetRecoilState(docIdsByDate);
  const updator = useUpdateTodo();
  const setDocCount = useSetDocCount();
  const CloseDropdownMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  const ref = useDetectClickOutside({ onTriggered: CloseDropdownMenu });

  const onClickMenu = () => {
    setIsOpen(prev => !prev);
  };

  const onClickDelete = async () => {
    const newAllDocument = { ...allDocument };
    delete newAllDocument[item.id];
    setAllDocument(newAllDocument);
    setDocIds(ids => ids.filter(id => id !== item.id));

    const allDocRef = doc(db, `${auth.currentUser?.uid}/All`);
    const dateDocRef = doc(db, `${auth.currentUser?.uid}/Date`);
    await updateDoc(allDocRef, { docMap: newAllDocument });
    await setDocCount(item.date, 'Minus');
    if (item.date) {
      await updateDoc(dateDocRef, { [item.date]: arrayRemove(item.id) });
    }
  };

  const onClickConvert = async () => {
    await updator(item, 'isNote', !item.isNote);
  };

  const onClickMoveList = () => {
    setMoveListFlag(prev => !prev);
  };

  return (
    <S.MenuContainer ref={ref}>
      <S.ListMenuIconContainer isEditor={isEditor} onClick={onClickMenu}>
        <FontAwesomeIcon icon={faEllipsis} className="toggle-menu-icon" />
      </S.ListMenuIconContainer>
      {isOpen && (
        <S.MenuModal>
          {!item.isNote && (
            <PriorityFlag toggleMenu={CloseDropdownMenu} todo={item} />
          )}

          {moveListFlag && <MoveListModal item={item} />}
          <S.MenuButtonContainer onClick={onClickMoveList}>
            <FontAwesomeIcon icon={faListUl} className="sub-icon" />
            <span>리스트 이동</span>
          </S.MenuButtonContainer>

          <S.MenuButtonContainer onClick={onClickConvert}>
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              className="sub-icon"
            />
            <span>{item.isNote ? '할일로 변환' : '노트로 변환'}</span>
          </S.MenuButtonContainer>

          <S.MenuButtonContainer onClick={onClickDelete}>
            <FontAwesomeIcon icon={faTrashCan} className="sub-icon" />
            <span>삭제하기</span>
          </S.MenuButtonContainer>
        </S.MenuModal>
      )}
    </S.MenuContainer>
  );
}

export default ListMenu;

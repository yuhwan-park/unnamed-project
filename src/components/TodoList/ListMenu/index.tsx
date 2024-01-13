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
import { allDocumentState, docIdsByDateState, myListsState } from 'atoms';
// firebase
import { arrayRemove, deleteField, updateDoc } from 'firebase/firestore';
// hooks
import { useUpdateTodo, useDetectClickOutside } from 'hooks';
// types
import { Document } from '@types';
// styles
import * as S from './style';
import { docRef } from 'utils';

interface IListMenu {
  item: Document;
  isEditor: boolean;
}

function ListMenu({ item, isEditor }: IListMenu) {
  const [isOpen, setIsOpen] = useState(false);
  const [moveListFlag, setMoveListFlag] = useState(false);
  const [allDocument, setAllDocument] = useRecoilState(allDocumentState);
  const [myLists, setMyLists] = useRecoilState(myListsState);
  const setDocIdsByDate = useSetRecoilState(docIdsByDateState);
  const updator = useUpdateTodo();
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

    if (item.date) {
      setDocIdsByDate(ids => ({
        ...ids,
        [item.date]: ids[item.date].filter(id => id !== item.id),
      }));
      await updateDoc(docRef('Date'), { [item.date]: arrayRemove(item.id) });
    }
    if (item.listId) {
      const newMyLists = {
        ...myLists,
        [item.listId]: {
          ...myLists[item.listId],
          docIds: myLists[item.listId].docIds.filter(id => id !== item.id),
        },
      };
      setMyLists(newMyLists);
      await updateDoc(docRef('Lists'), { ...newMyLists });
    }
    await updateDoc(docRef('All'), { [item.id]: deleteField() });
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

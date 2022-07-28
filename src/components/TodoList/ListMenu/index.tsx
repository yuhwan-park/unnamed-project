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
import { allDocumentState, documentState, myListDocsState } from 'atoms';
// firebase
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from 'firebase-source';
// hooks
import {
  useGetDocRef,
  useGetListDocRef,
  useUpdateDocs,
  useDetectClickOutside,
  useSetDocCount,
} from 'hooks';
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
  const setDocument = useSetRecoilState(documentState);
  const setMyListDocs = useSetRecoilState(myListDocsState);
  const setDocCount = useSetDocCount();
  const [allDocument, setAllDocument] = useRecoilState(allDocumentState);
  const updator = useUpdateDocs();
  const docRef = useGetDocRef(item);
  const ListDocRef = useGetListDocRef(item);
  const CloseDropdownMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  const ref = useDetectClickOutside({ onTriggered: CloseDropdownMenu });

  const onClickMenu = () => {
    setIsOpen(prev => !prev);
  };

  const onClickDelete = async () => {
    setDocument(todos => todos.filter(todo => todo.id !== item.id));
    setMyListDocs(docs => docs.filter(doc => doc.id !== item.id));

    const newAllDocument = { ...allDocument };
    delete newAllDocument[item.id];
    setAllDocument(newAllDocument);

    if (ListDocRef) await deleteDoc(ListDocRef);
    if (docRef) await deleteDoc(docRef);

    const allDocRef = doc(db, `${auth.currentUser?.uid}/All`);
    await updateDoc(allDocRef, { docMap: newAllDocument });
    await setDocCount(item.date, 'Minus');
  };

  const onClickConvert = async () => {
    await updator(item, 'isNote', !item.isNote, true);
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

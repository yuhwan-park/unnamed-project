// dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListUl,
  faCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
// states
import { myListDocsState, myListsState, paramState } from 'atoms';
// firebase
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db } from 'firebase-source';
// hooks
import { useUpdateDocs } from 'hooks';
// types
import { IDocument, IMyList } from 'types';
// styles
import * as S from './style';

interface IMoveListModalProps {
  item: IDocument;
}

function MoveListModal({ item }: IMoveListModalProps) {
  const myLists = useRecoilValue(myListsState);
  const setMyListDocs = useSetRecoilState(myListDocsState);
  const params = useRecoilValue(paramState);
  const navigator = useNavigate();
  const updator = useUpdateDocs();

  const onClickMoveListItem = async (list: IMyList) => {
    if (item.list && item.list.id === list.id) return;

    if (params['listId']) {
      setMyListDocs(docs => docs.filter(doc => doc.id !== item.id));
      navigator(`/main/lists/${params['listId']}/tasks`);
    }

    await updator(item, 'list', list, true);

    if (item.list) {
      const oldMyListDocRef = doc(
        db,
        `${auth.currentUser?.uid}/Lists/${item.list.id}/${item.id}`,
      );
      await deleteDoc(oldMyListDocRef);
    }

    const newMyListDocRef = doc(
      db,
      `${auth.currentUser?.uid}/Lists/${list.id}/${item.id}`,
    );
    const newItem = { ...item, list };
    await setDoc(newMyListDocRef, newItem);
  };

  const onClickDeleteList = async () => {
    if (!item.list) return;
    setMyListDocs(docs => docs.filter(doc => doc.id !== item.id));

    await updator(item, 'list', null, true);
    await deleteDoc(
      doc(db, `${auth.currentUser?.uid}/Lists/${item.list.id}/${item.id}`),
    );
  };

  return (
    <S.Wrapper>
      <S.MyListContainer onClick={onClickDeleteList}>
        <S.MenuIcon>
          <FontAwesomeIcon icon={faCircleXmark} />
        </S.MenuIcon>
        <S.MyListTitle>없음</S.MyListTitle>
        {!item.list && (
          <S.CheckIconContainer>
            <FontAwesomeIcon icon={faCheck} />
          </S.CheckIconContainer>
        )}
      </S.MyListContainer>

      {myLists.length
        ? myLists.map(list => (
            <S.MyListContainer
              key={list.id}
              onClick={() => onClickMoveListItem(list)}
            >
              <S.MenuIcon>
                <FontAwesomeIcon icon={faListUl} />
              </S.MenuIcon>
              <S.MyListTitle>{list.title}</S.MyListTitle>
              {list.id === item.list?.id && (
                <S.CheckIconContainer>
                  <FontAwesomeIcon icon={faCheck} />
                </S.CheckIconContainer>
              )}
            </S.MyListContainer>
          ))
        : null}
    </S.Wrapper>
  );
}

export default MoveListModal;

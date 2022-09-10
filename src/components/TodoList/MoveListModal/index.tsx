// dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListUl,
  faCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilState, useRecoilValue } from 'recoil';
// states
import { myListsArray, myListsState } from 'atoms';
// firebase
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from 'firebase-source';
// hooks
import { useUpdateTodo } from 'hooks';
// types
import { Document, MyList } from '@types';
// styles
import * as S from './style';

interface IMoveListModalProps {
  item: Document;
}

function MoveListModal({ item }: IMoveListModalProps) {
  const [myLists, setMyLists] = useRecoilState(myListsState);
  const sortedMyLists = useRecoilValue(myListsArray);
  const updator = useUpdateTodo();
  const listsRef = doc(db, `${auth.currentUser?.uid}/Lists`);

  const onClickMoveListItem = async (list: MyList) => {
    if (item.list && item.list.id === list.id) return;

    if (item.list) {
      const newMyLists = {
        ...myLists,
        [item.list.id]: {
          ...myLists[item.list.id],
          docIds: myLists[item.list.id].docIds.filter(id => id !== item.id),
        },
        [list.id]: {
          ...myLists[list.id],
          docIds: [...myLists[list.id].docIds, item.id],
        },
      };
      setMyLists(newMyLists);
      await setDoc(listsRef, { ...newMyLists });
    } else {
      const newMyLists = {
        ...myLists,
        [list.id]: {
          ...myLists[list.id],
          docIds: [...myLists[list.id].docIds, item.id],
        },
      };
      setMyLists(newMyLists);
      await setDoc(listsRef, { ...newMyLists });
    }
    await updator(item, 'list', list);
  };

  const onClickDeleteList = async () => {
    if (!item.list) return;
    const newMyLists = {
      ...myLists,
      [item.list.id]: {
        ...myLists[item.list.id],
        docIds: myLists[item.list.id].docIds.filter(id => id !== item.id),
      },
    };
    setMyLists(newMyLists);
    await setDoc(listsRef, { ...newMyLists });
    await updator(item, 'list', null);
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

      {sortedMyLists.length
        ? sortedMyLists.map(list => (
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

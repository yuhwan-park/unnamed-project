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
import { setDoc } from 'firebase/firestore';
// hooks
import { useUpdateTodo } from 'hooks';
// types
import { Document, MyList } from '@types';
// styles
import * as S from './style';
// utils
import { docRef } from 'utils';

interface IMoveListModalProps {
  item: Document;
}

function MoveListModal({ item }: IMoveListModalProps) {
  const [myLists, setMyLists] = useRecoilState(myListsState);
  const sortedMyLists = useRecoilValue(myListsArray);
  const updator = useUpdateTodo();

  const onClickMoveListItem = async (list: MyList) => {
    if (item.listId === list.id) return;

    if (item.listId) {
      const newMyLists = {
        ...myLists,
        [item.listId]: {
          ...myLists[item.listId],
          docIds: myLists[item.listId].docIds.filter(id => id !== item.id),
        },
        [list.id]: {
          ...myLists[list.id],
          docIds: [...myLists[list.id].docIds, item.id],
        },
      };
      setMyLists(newMyLists);
      await setDoc(docRef('Lists'), { ...newMyLists });
    } else {
      const newMyLists = {
        ...myLists,
        [list.id]: {
          ...myLists[list.id],
          docIds: [...myLists[list.id].docIds, item.id],
        },
      };
      setMyLists(newMyLists);
      await setDoc(docRef('Lists'), { ...newMyLists });
    }
    await updator(item, 'listId', list.id);
  };

  const onClickDeleteList = async () => {
    if (!item.listId) return;
    const newMyLists = {
      ...myLists,
      [item.listId]: {
        ...myLists[item.listId],
        docIds: myLists[item.listId].docIds.filter(id => id !== item.id),
      },
    };
    setMyLists(newMyLists);
    await setDoc(docRef('Lists'), { ...newMyLists });
    await updator(item, 'listId', '');
  };

  return (
    <S.Wrapper>
      <S.MyListContainer onClick={onClickDeleteList}>
        <S.MenuIcon>
          <FontAwesomeIcon icon={faCircleXmark} />
        </S.MenuIcon>
        <S.MyListTitle>없음</S.MyListTitle>
        {!item.listId && (
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
              {list.id === item.listId && (
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

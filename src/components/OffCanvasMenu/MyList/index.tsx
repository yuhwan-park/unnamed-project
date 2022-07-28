// dependencies
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
// components
import MyListItem from '../MyListItem';
// states
import { loadingState, myListModalState, myListsState } from 'atoms';
// firebase
import { auth, db } from 'firebase-source';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
// styles
import * as S from './style';

function MyList() {
  const setToggleModal = useSetRecoilState(myListModalState);
  const setIsLoading = useSetRecoilState(loadingState);
  const [myLists, setMyLists] = useRecoilState(myListsState);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const plusRef = useRef<HTMLDivElement>(null);

  const onClickOpenModal = () => {
    setToggleModal('Create');
  };

  const onClickListHeader = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (!target.contains(plusRef.current)) return;

    setIsCollapsed(prev => !prev);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const docRef = doc(db, `${user.uid}/Lists`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMyLists(docSnap.data().lists);
        }
        setIsLoading(obj => ({ ...obj, myLists: true }));
      }
    });
  }, [setIsLoading, setMyLists]);

  return (
    <S.MyListContainer>
      <S.MyListHeader isCollapsed={isCollapsed} onClick={onClickListHeader}>
        <S.ListTitle>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
          <h2>리스트</h2>
        </S.ListTitle>
        <div
          className="plus-button"
          ref={plusRef}
          onClick={onClickOpenModal}
          data-testid="add-list-button"
        >
          <FontAwesomeIcon icon={faPlus} className="toggle-menu-icon" />
        </div>
      </S.MyListHeader>
      {isCollapsed && (
        <S.MyListContent>
          {myLists.length ? (
            myLists.map(list => <MyListItem key={list.id} list={list} />)
          ) : (
            <S.EmptyContent>
              카테고리별로 리스트를 추가하여 할 일 혹은 노트를 관리해보세요!
            </S.EmptyContent>
          )}
        </S.MyListContent>
      )}
    </S.MyListContainer>
  );
}

export default MyList;

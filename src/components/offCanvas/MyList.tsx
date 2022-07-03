import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadingState, myListModalState, myListsState } from 'atoms';
import { auth, db } from 'firebase-source';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ListHeader } from 'style/main-page';
import styled from 'styled-components';
import MyListItem from './MyListItem';

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
    <MyListContainer>
      <MyListHeader isCollapsed={isCollapsed} onClick={onClickListHeader}>
        <ListTitle>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
          <h2>리스트</h2>
        </ListTitle>
        <div
          className="plus-button"
          ref={plusRef}
          onClick={onClickOpenModal}
          data-testid="add-list-button"
        >
          <FontAwesomeIcon icon={faPlus} className="toggle-menu-icon" />
        </div>
      </MyListHeader>
      {isCollapsed && (
        <MyListContent>
          {myLists.length ? (
            myLists.map(list => <MyListItem key={list.id} list={list} />)
          ) : (
            <EmptyContent>
              카테고리별로 리스트를 추가하여 할 일 혹은 노트를 관리해보세요!
            </EmptyContent>
          )}
        </MyListContent>
      )}
    </MyListContainer>
  );
}

export default MyList;

const MyListContainer = styled.div`
  padding: 10px 20px 100px 10px;
  margin-bottom: 40px;
`;

const ListTitle = styled.div`
  display: flex;
  font-size: ${props => props.theme.fontSize.small};
`;

const MyListHeader = styled(ListHeader)`
  justify-content: space-between;
  .plus-button {
    padding: 0 5px;
  }
`;

const MyListContent = styled.ul`
  height: fit-content;
`;

const EmptyContent = styled.div`
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.4);
  font-size: ${props => props.theme.fontSize.small};
  line-height: 16px;
  min-width: 200px;
`;

// dependencies
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// components
import MyListItem from '../MyListItem';
// states
import { myListModalState, myListsArray } from 'atoms';
// styles
import * as S from './style';

function MyList() {
  const myLists = useRecoilValue(myListsArray);
  const setToggleModal = useSetRecoilState(myListModalState);
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
          {Object.values(myLists).length ? (
            Object.values(myLists).map(list => (
              <MyListItem key={list.id} list={list} />
            ))
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

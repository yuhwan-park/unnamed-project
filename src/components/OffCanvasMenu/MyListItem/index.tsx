// dependencies
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
// components
import MyListMenu from '../MyListMenu';
// states
import {
  isWideState,
  screenStatusState,
  selectedListState,
  isOffCanvasOpenState,
} from 'atoms';
// types
import { IMyList } from 'types';
// styles
import * as S from './style';

interface IMyListItemProps {
  list: IMyList;
}

function MyListItem({ list }: IMyListItemProps) {
  const [isSelected, setIsSelected] = useState(false);
  const selectedList = useRecoilValue(selectedListState);
  const isWide = useRecoilValue(isWideState);
  const setIsOffCanvasOpen = useSetRecoilState(isOffCanvasOpenState);
  const setScreenStatus = useSetRecoilState(screenStatusState);
  const navigator = useNavigate();

  const onClickListItem = (e: any) => {
    navigator(`/main/lists/${list.id}/tasks`);
    setScreenStatus('List');
    if (!isWide && !e.target.closest('.list-menu')) {
      setIsOffCanvasOpen(false);
    }
  };

  useEffect(() => {
    setIsSelected(list.id === selectedList?.id ? true : false);
  }, [list.id, selectedList?.id]);

  return (
    <S.Wrapper onClick={onClickListItem} isSelected={isSelected}>
      <S.MenuIcon>
        <FontAwesomeIcon icon={faListUl} />
      </S.MenuIcon>
      <p>{list.title}</p>
      <MyListMenu />
    </S.Wrapper>
  );
}

export default MyListItem;

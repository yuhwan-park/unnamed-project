import styled from 'styled-components';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { IMyList } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import MyListMenu from './MyListMenu';
import { MenuIcon } from 'style/main-page';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isWideState, selectedListState, toggleMenuState } from 'atoms';
import { useEffect, useState } from 'react';

interface IMyListItemProps {
  list: IMyList;
}

function MyListItem({ list }: IMyListItemProps) {
  const [isSelected, setIsSelected] = useState(false);
  const selectedList = useRecoilValue(selectedListState);
  const isWide = useRecoilValue(isWideState);
  const setToggleMenu = useSetRecoilState(toggleMenuState);
  const navigator = useNavigate();

  const onClickListItem = (e: any) => {
    navigator(`/main/lists/${list.id}/tasks`);
    if (!isWide && !e.target.closest('.list-menu')) {
      setToggleMenu(false);
    }
  };

  useEffect(() => {
    setIsSelected(list.id === selectedList?.id ? true : false);
  }, [list.id, selectedList?.id]);

  return (
    <Wrapper onClick={onClickListItem} isSelected={isSelected}>
      <MenuIcon>
        <FontAwesomeIcon icon={faListUl} />
      </MenuIcon>
      <p>{list.title}</p>
      <MyListMenu />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isSelected: boolean }>`
  position: relative;
  display: flex;
  padding: 10px 0;
  border-radius: 4px;
  background-color: ${props =>
    props.isSelected ? 'rgb(210, 210, 210)' : 'transparent'};
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.isSelected ? 'rgb(210, 210, 210)' : 'rgb(230, 230, 230)'};
    .toggle-menu-icon {
      opacity: 1;
    }
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
`;

export default MyListItem;

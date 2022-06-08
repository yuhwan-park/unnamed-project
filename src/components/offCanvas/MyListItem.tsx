import styled from 'styled-components';
import { faListUl, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { IMyList } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IMyListItemProps {
  list: IMyList;
}

function MyListItem({ list }: IMyListItemProps) {
  const navigator = useNavigate();
  const onClickListItem = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains('menu-icon')) return;
    navigator(`/main/lists/${list.id}/tasks`);
  };

  return (
    <Wrapper onClick={onClickListItem}>
      <FontAwesomeIcon icon={faListUl} />
      <p>{list.title}</p>
      <FontAwesomeIcon icon={faEllipsis} className="menu-icon" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgb(230, 230, 230);
    .menu-icon {
      opacity: 1;
    }
  }
  svg {
    color: rgba(0, 0, 0, 0.3);
    padding: 0 10px;
  }
  .menu-icon {
    opacity: 0;
    position: absolute;
    right: 0;
    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }
  p {
    white-space: nowrap;
  }
`;

export default MyListItem;

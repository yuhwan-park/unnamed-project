import styled from 'styled-components';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { IMyList } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import MyListMenu from './MyListMenu';
import { MenuIcon } from 'style/main-page';

interface IMyListItemProps {
  list: IMyList;
}

function MyListItem({ list }: IMyListItemProps) {
  const navigator = useNavigate();
  const onClickListItem = () => {
    navigator(`/main/lists/${list.id}/tasks`);
  };

  return (
    <Wrapper onClick={onClickListItem}>
      <MenuIcon>
        <FontAwesomeIcon icon={faListUl} />
      </MenuIcon>
      <p>{list.title}</p>
      <MyListMenu />
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
    .toggle-menu-icon {
      opacity: 1;
    }
  }
  p {
    white-space: nowrap;
  }
`;

export default MyListItem;

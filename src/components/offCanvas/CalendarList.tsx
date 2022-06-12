import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { MenuIcon } from 'style/main-page';
import styled from 'styled-components';

function CalendarList() {
  const navigator = useNavigate();

  const onClickDateList = () => {
    navigator('/main');
  };

  return (
    <DateListContainer onClick={onClickDateList}>
      <MenuIcon>
        <FontAwesomeIcon icon={faCalendarDays} />
      </MenuIcon>
      <p>날짜별로 보기</p>
    </DateListContainer>
  );
}

const DateListContainer = styled.div`
  display: flex;
  cursor: pointer;
  padding: 20px 0;
  margin: 0 20px;
  border-radius: 4px;
  white-space: nowrap;
  &:hover {
    background-color: rgb(230, 230, 230);
  }
`;

export default CalendarList;

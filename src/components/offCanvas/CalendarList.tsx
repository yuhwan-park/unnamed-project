import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CalendarList() {
  const navigator = useNavigate();

  const onClickDateList = () => {
    navigator('/main');
  };

  return (
    <DateListContainer onClick={onClickDateList}>
      <FontAwesomeIcon icon={faCalendarDays} />
      <p>날짜별로 보기</p>
    </DateListContainer>
  );
}

const DateListContainer = styled.div`
  display: flex;
  cursor: pointer;
  padding: 20px 10px;
  margin: 0 20px;
  border-radius: 4px;
  &:hover {
    background-color: rgb(230, 230, 230);
  }
  svg {
    color: rgba(0, 0, 0, 0.3);
    padding: 0 10px;
  }
`;

export default CalendarList;

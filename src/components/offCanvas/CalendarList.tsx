import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { paramState } from 'atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { MenuIcon, OffCanvasMenuContainer } from 'style/main-page';

function CalendarList() {
  const params = useRecoilValue(paramState);
  const { pathname } = useLocation();
  const navigator = useNavigate();

  const onClickDateList = () => {
    navigator('/main');
  };

  return (
    <OffCanvasMenuContainer
      isSelected={!params['listId'] && !pathname.includes('all')}
      onClick={onClickDateList}
    >
      <MenuIcon>
        <FontAwesomeIcon icon={faCalendarDays} />
      </MenuIcon>
      <p>날짜별로 보기</p>
    </OffCanvasMenuContainer>
  );
}

export default CalendarList;

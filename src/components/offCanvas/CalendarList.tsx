import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isWideState, paramState, toggleMenuState } from 'atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MenuIcon, OffCanvasMenuContainer } from 'style/main-page';

function CalendarList() {
  const params = useRecoilValue(paramState);
  const isWide = useRecoilValue(isWideState);
  const setToggleMenu = useSetRecoilState(toggleMenuState);
  const { pathname } = useLocation();
  const navigator = useNavigate();

  const onClickDateList = () => {
    navigator('/main');
    if (!isWide) {
      setToggleMenu(false);
    }
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

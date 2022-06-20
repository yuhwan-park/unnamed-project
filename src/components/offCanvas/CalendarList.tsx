import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isWideState, screenStatusState, toggleMenuState } from 'atoms';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MenuIcon, OffCanvasMenuContainer } from 'style/main-page';

function CalendarList() {
  const isWide = useRecoilValue(isWideState);
  const setToggleMenu = useSetRecoilState(toggleMenuState);
  const [screenStatus, setScreenStatus] = useRecoilState(screenStatusState);
  const navigator = useNavigate();

  const onClickDateList = () => {
    navigator('/main');
    setScreenStatus('Date');
    if (!isWide) {
      setToggleMenu(false);
    }
  };

  return (
    <OffCanvasMenuContainer
      isSelected={screenStatus === 'Date'}
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

// dependencies
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// states
import { isWideState, screenStatusState, toggleMenuState } from 'atoms';
// styles
import * as S from './style';

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
    <S.OffCanvasMenuContainer
      isSelected={screenStatus === 'Date'}
      onClick={onClickDateList}
      data-testid="calendar-list-container"
    >
      <S.MenuIcon>
        <FontAwesomeIcon icon={faCalendarDays} />
      </S.MenuIcon>
      <p>날짜별로 보기</p>
    </S.OffCanvasMenuContainer>
  );
}

export default CalendarList;

// dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// states
import { isWideState, screenStatusState, toggleMenuState } from 'atoms';
// styles
import * as S from './style';

function ShowAllList() {
  const navigator = useNavigate();
  const isWide = useRecoilValue(isWideState);
  const setToggleMenu = useSetRecoilState(toggleMenuState);
  const [screenStatus, setScreenStatus] = useRecoilState(screenStatusState);

  const onClickDateList = () => {
    navigator('/main/all/tasks');
    setScreenStatus('All');
    if (!isWide) {
      setToggleMenu(false);
    }
  };

  return (
    <S.OffCanvasMenuContainer
      isSelected={screenStatus === 'All'}
      onClick={onClickDateList}
      data-testid="show-all-container"
    >
      <S.MenuIcon>
        <FontAwesomeIcon icon={faFolderOpen} />
      </S.MenuIcon>
      <p>모두 보기</p>
    </S.OffCanvasMenuContainer>
  );
}

export default ShowAllList;

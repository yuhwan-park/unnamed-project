import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { MenuIcon, OffCanvasMenuContainer } from 'style/main-page';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isWideState, screenStatusState, toggleMenuState } from 'atoms';

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
    <OffCanvasMenuContainer
      isSelected={screenStatus === 'All'}
      onClick={onClickDateList}
      data-testid="show-all-container"
    >
      <MenuIcon>
        <FontAwesomeIcon icon={faFolderOpen} />
      </MenuIcon>
      <p>모두 보기</p>
    </OffCanvasMenuContainer>
  );
}

export default ShowAllList;

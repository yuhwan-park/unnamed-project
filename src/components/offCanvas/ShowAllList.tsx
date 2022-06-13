import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuIcon, OffCanvasMenuContainer } from 'style/main-page';

function ShowAllList() {
  const { pathname } = useLocation();
  const navigator = useNavigate();

  const onClickDateList = () => {
    navigator('/main/all/tasks');
  };

  return (
    <OffCanvasMenuContainer
      isSelected={pathname.includes('all')}
      onClick={onClickDateList}
    >
      <MenuIcon>
        <FontAwesomeIcon icon={faFolderOpen} />
      </MenuIcon>
      <p>모두 보기</p>
    </OffCanvasMenuContainer>
  );
}

export default ShowAllList;

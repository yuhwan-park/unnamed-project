// dependencies
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashArrowUp, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
// states
import { myListModalState } from 'atoms';
// hooks
import { useDetectClickOutside } from 'hooks';
// styles
import * as S from './style';

function MyListMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const CloseDropdownMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  const ref = useDetectClickOutside({ onTriggered: CloseDropdownMenu });

  const setToggleModal = useSetRecoilState(myListModalState);

  const onClickMenu = () => {
    setIsOpen(prev => !prev);
  };

  const onClickDeleteList = () => {
    setToggleModal(`Delete`);
  };
  const onClickEditList = () => {
    setToggleModal(`Edit`);
  };

  return (
    <>
      <S.MenuContainer onClick={onClickMenu} ref={ref} className="list-menu">
        <FontAwesomeIcon icon={faEllipsis} className="toggle-menu-icon" />
        {isOpen ? (
          <S.MenuModal>
            <S.MenuButtonContainer onClick={onClickEditList}>
              <FontAwesomeIcon icon={faFilePen} className="sub-icon" />
              <span>리스트 편집</span>
            </S.MenuButtonContainer>

            <S.MenuButtonContainer onClick={onClickDeleteList}>
              <FontAwesomeIcon icon={faTrashArrowUp} className="sub-icon" />
              <span>리스트 삭제</span>
            </S.MenuButtonContainer>
          </S.MenuModal>
        ) : null}
      </S.MenuContainer>
    </>
  );
}

export default MyListMenu;

import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashArrowUp, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useState } from 'react';
import { MenuButtonContainer, MenuContainer, MenuModal } from 'style/main-page';
import { useSetRecoilState } from 'recoil';
import { myListModalState } from 'atoms';
import { useDetectClickOutside } from 'hooks/useDetectClickOutside';

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
      <MenuContainer onClick={onClickMenu} ref={ref} className="list-menu">
        <FontAwesomeIcon icon={faEllipsis} className="toggle-menu-icon" />
        {isOpen ? (
          <MenuModal>
            <MenuButtonContainer onClick={onClickEditList}>
              <FontAwesomeIcon icon={faFilePen} className="sub-icon" />
              <span>리스트 편집</span>
            </MenuButtonContainer>

            <MenuButtonContainer onClick={onClickDeleteList}>
              <FontAwesomeIcon icon={faTrashArrowUp} className="sub-icon" />
              <span>리스트 삭제</span>
            </MenuButtonContainer>
          </MenuModal>
        ) : null}
      </MenuContainer>
    </>
  );
}

export default MyListMenu;

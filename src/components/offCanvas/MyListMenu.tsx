import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashArrowUp, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { MenuButtonContainer, MenuContainer, MenuModal } from 'style/main-page';
import { useSetRecoilState } from 'recoil';
import { myListModalState } from 'atoms';

function MyListMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => document.removeEventListener('mousedown', handleClickOutSide);
  }, []);
  return (
    <>
      <MenuContainer onClick={onClickMenu} ref={menuRef}>
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

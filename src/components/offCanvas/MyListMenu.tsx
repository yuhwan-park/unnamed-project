import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashArrowUp, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { MenuButtonContainer, MenuContainer, MenuModal } from 'style/main-page';
import { IMyList } from 'types';
import { useSetRecoilState } from 'recoil';
import { myListModalState } from 'atoms';

interface IMyListMenuProps {
  list: IMyList;
}

function MyListMenu({ list }: IMyListMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const setToggleModal = useSetRecoilState(myListModalState);

  const onClickMenu = () => {
    setIsOpen(prev => !prev);
  };

  const onClickDeleteList = async () => {
    setToggleModal(`Delete-${list.id}`);
  };

  useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLDivElement).contains(e.target)
      ) {
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
            <MenuButtonContainer>
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

import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { MenuButtonContainer, MenuContainer, MenuModal } from 'style/main-page';
import { IMyList } from 'types';

interface IMyListMenuProps {
  list: IMyList;
}

function MyListMenu({ list }: IMyListMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onClickMenu = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutSide = () => {
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => document.removeEventListener('mousedown', handleClickOutSide);
  }, []);
  return (
    <MenuContainer onClick={onClickMenu}>
      <FontAwesomeIcon icon={faEllipsis} className="toggle-menu-icon" />
      {isOpen ? (
        <MenuModal>
          <MenuButtonContainer></MenuButtonContainer>
        </MenuModal>
      ) : null}
    </MenuContainer>
  );
}

export default MyListMenu;

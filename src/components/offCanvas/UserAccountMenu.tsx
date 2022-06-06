import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { MenuButtonContainer, MenuContainer, MenuModal } from 'style/main-page';

function UserAccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const onClickMenu = () => {
    setIsOpen(prev => !prev);
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
    <MenuContainer onClick={onClickMenu} ref={menuRef}>
      <FontAwesomeIcon icon={faGear} className="toggle-menu-icon" />
      {isOpen ? (
        <MenuModal>
          <MenuButtonContainer></MenuButtonContainer>
        </MenuModal>
      ) : null}
    </MenuContainer>
  );
}

export default UserAccountMenu;

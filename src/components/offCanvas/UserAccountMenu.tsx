import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { MenuButtonContainer, MenuContainer, MenuModal } from 'style/main-page';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase-source';

function UserAccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const onClickMenu = () => {
    setIsOpen(prev => !prev);
  };

  const onClickSignOut = async () => {
    await signOut(auth);
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
          <MenuButtonContainer onClick={onClickSignOut}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="sub-icon"
            />
            <span>로그아웃</span>
          </MenuButtonContainer>
        </MenuModal>
      ) : null}
    </MenuContainer>
  );
}

export default UserAccountMenu;

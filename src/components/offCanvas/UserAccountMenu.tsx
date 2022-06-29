import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useCallback, useState } from 'react';
import { MenuButtonContainer, MenuContainer, MenuModal } from 'style/main-page';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase-source';
import { useSetRecoilState } from 'recoil';
import { documentState } from 'atoms';
import { useDetectClickOutside } from 'hooks/useDetectClickOutside';

function UserAccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const setDocuments = useSetRecoilState(documentState);
  const CloseDropdownMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  const ref = useDetectClickOutside({ onTriggered: CloseDropdownMenu });

  const onClickMenu = () => {
    setIsOpen(prev => !prev);
  };

  const onClickSignOut = async () => {
    await signOut(auth);
    setDocuments([]);
  };

  return (
    <MenuContainer onClick={onClickMenu} ref={ref} data-testid="user-menu">
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

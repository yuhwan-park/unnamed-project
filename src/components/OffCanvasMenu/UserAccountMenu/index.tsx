// dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
// states
import { documentState } from 'atoms';
// firebase
import { signOut } from 'firebase/auth';
import { auth } from 'firebase-source';
// hooks
import { useDetectClickOutside } from 'hooks';
// styles
import * as S from './style';

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
    <S.MenuContainer onClick={onClickMenu} ref={ref} data-testid="user-menu">
      <FontAwesomeIcon icon={faGear} className="toggle-menu-icon" />
      {isOpen ? (
        <S.MenuModal>
          <S.MenuButtonContainer onClick={onClickSignOut}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="sub-icon"
            />
            <span>로그아웃</span>
          </S.MenuButtonContainer>
        </S.MenuModal>
      ) : null}
    </S.MenuContainer>
  );
}

export default UserAccountMenu;

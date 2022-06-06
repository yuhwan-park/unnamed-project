import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { User } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toggleMenuState } from 'atoms';
import { useEffect, useRef, useState } from 'react';
import { MenuButtonContainer, MenuContainer, MenuModal } from 'style/main-page';

const menuVariants = {
  initial: {
    width: 0,
    opacity: 0,
  },
  visible: {
    width: '400px',
    opacity: 1,
  },
  exit: {
    width: 0,
    opacity: 0,
  },
};

interface IOffCanvasMenuProps {
  user: User;
}

function OffCanvasMenu({ user }: IOffCanvasMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = useRecoilValue(toggleMenuState);

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
  });
  return (
    <AnimatePresence initial={false}>
      {toggleMenu && (
        <Wrapper
          variants={menuVariants}
          initial="initial"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween' }}
        >
          <AuthContainer>
            <ProfileImage src={user.photoURL as string} alt="user_profile" />
            <div>{user.displayName}</div>
            <MenuContainer onClick={onClickMenu} ref={menuRef}>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="toggle-menu-icon"
              />
              {isOpen ? (
                <MenuModal>
                  <MenuButtonContainer></MenuButtonContainer>
                </MenuModal>
              ) : null}
            </MenuContainer>
          </AuthContainer>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

export default OffCanvasMenu;

const Wrapper = styled(motion.div)`
  height: 100%;
  border-right: 1px solid #bbb;
`;

const AuthContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 10px;
  &:hover {
    .toggle-menu-icon {
      opacity: 1;
    }
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

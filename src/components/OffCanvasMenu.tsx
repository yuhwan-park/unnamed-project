import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { User } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toggleMenuState } from 'atoms';
import { useEffect, useRef, useState } from 'react';

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
        <Container
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
                <Modal>
                  <MenuButton></MenuButton>
                </Modal>
              ) : null}
            </MenuContainer>
          </AuthContainer>
        </Container>
      )}
    </AnimatePresence>
  );
}

export default OffCanvasMenu;

const Container = styled(motion.div)`
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

const MenuContainer = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
  .toggle-menu-icon {
    padding: 0 20px;
    opacity: 0;
    color: rgba(0, 0, 0, 0.3);
    &:hover {
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px;
  cursor: pointer;
  span {
    font-size: ${props => props.theme.fontSize.medium};
  }
  .sub-icon {
    color: #bbb;
    width: 20px;
    padding-right: 10px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const Modal = styled.div`
  position: absolute;
  right: -30px;
  width: 200px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 1;
  cursor: auto;
`;

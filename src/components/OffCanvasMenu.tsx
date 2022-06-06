import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toggleMenuState } from 'atoms';
import UserAccount from './offCanvas/UserAccount';

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

function OffCanvasMenu() {
  const toggleMenu = useRecoilValue(toggleMenuState);

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
          <UserAccount />
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

export default OffCanvasMenu;

const Wrapper = styled(motion.div)`
  height: 100%;
  background-color: rgb(244, 244, 244);
`;

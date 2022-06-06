import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toggleMenuState } from '../atoms';

const menuVariants = {
  initial: {
    width: 0,
  },
  visible: {
    width: '500px',
  },
  exit: {
    width: 0,
  },
};

function MainMenu() {
  const toggleMenu = useRecoilValue(toggleMenuState);
  return (
    <AnimatePresence initial={false}>
      {toggleMenu && (
        <Container
          variants={menuVariants}
          initial="initial"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween' }}
        ></Container>
      )}
    </AnimatePresence>
  );
}

export default MainMenu;

const Container = styled(motion.div)`
  width: 350px;
  height: 100%;
  background-color: blue;
`;

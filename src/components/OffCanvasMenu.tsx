import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toggleMenuState } from 'atoms';
import UserAccount from './offCanvas/UserAccount';
import { menuVariants } from 'variants';
import MyList from './offCanvas/MyList';

function OffCanvasMenu() {
  const toggleMenu = useRecoilValue(toggleMenuState);

  return (
    <AnimatePresence initial={false}>
      {toggleMenu && (
        <Wrapper
          key="offCanvas"
          variants={menuVariants}
          initial="initial"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween' }}
        >
          <UserAccount />
          <MyList />
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

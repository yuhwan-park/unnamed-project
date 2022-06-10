import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { paramState, toggleMenuState } from 'atoms';
import UserAccount from './offCanvas/UserAccount';
import { menuVariants } from 'variants';
import MyList from './offCanvas/MyList';
import CalendarList from './offCanvas/CalendarList';

function OffCanvasMenu() {
  const params = useRecoilValue(paramState);
  const toggleMenu = useRecoilValue(toggleMenuState);

  return (
    <AnimatePresence>
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
          {params['listId'] && <CalendarList />}
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

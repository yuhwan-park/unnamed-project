import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toggleMenuState } from 'atoms';
import UserAccount from './offCanvas/UserAccount';
import { menuVariants } from 'variants';
import MyList from './offCanvas/MyList';
import CalendarList from './offCanvas/CalendarList';
import ShowAllList from './offCanvas/ShowAllList';
import React from 'react';

function OffCanvasMenu() {
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
          <MainMenuContainer>
            <ShowAllList />
            <CalendarList />
          </MainMenuContainer>
          <MyList />
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

export default React.memo(OffCanvasMenu);

const Wrapper = styled(motion.div)`
  height: 100%;
  background-color: rgb(244, 244, 244);
  max-width: 350px;
`;

const MainMenuContainer = styled.div`
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid rgba(24, 24, 24, 0.1);
`;

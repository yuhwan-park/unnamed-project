import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isWideState, myListModalState, toggleMenuState } from 'atoms';
import UserAccount from './offCanvas/UserAccount';
import { menuVariants } from 'variants';
import MyList from './offCanvas/MyList';
import CalendarList from './offCanvas/CalendarList';
import ShowAllList from './offCanvas/ShowAllList';
import { memo, useEffect } from 'react';
import { devices } from 'style/media-queries';
import MyListModal from './offCanvas/MyListModal';

function OffCanvasMenu() {
  const [toggleMenu, setToggleMenu] = useRecoilState(toggleMenuState);
  const toggleModal = useRecoilValue(myListModalState);
  const isWide = useRecoilValue(isWideState);

  useEffect(() => {
    setToggleMenu(isWide);
  }, [setToggleMenu, isWide]);

  return (
    <>
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
      {toggleModal && <MyListModal />}
    </>
  );
}

export default memo(OffCanvasMenu);

const Wrapper = styled(motion.div)`
  height: 100%;
  background-color: rgb(244, 244, 244);
  max-width: 350px;
  overflow-x: hidden;
  overflow-y: scroll;
  @media ${devices.laptop} {
    position: absolute;
    z-index: 10;
    box-shadow: 0 6px 20px rgb(0 0 0 / 15%);
  }
  &::-webkit-scrollbar {
    width: 4px;
    margin-right: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const MainMenuContainer = styled.div`
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid rgba(24, 24, 24, 0.1);
`;

// dependencies
import { AnimatePresence } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import { memo, useEffect } from 'react';
// components
import UserAccount from './UserAccount';
import ShowAllList from './ShowAllList';
import CalendarList from './CalendarList';
import MyList from './MyList';
import MyListModal from './MyListModal';
// states
import { isWideState, myListModalState, toggleMenuState } from 'atoms';
// styles
import * as S from './style';
// etc
import { menuVariants } from 'variants';

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
          <S.Wrapper
            key="offCanvas"
            variants={menuVariants}
            initial="initial"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween' }}
          >
            <UserAccount />
            <S.MainMenuContainer>
              <ShowAllList />
              <CalendarList />
            </S.MainMenuContainer>
            <MyList />
          </S.Wrapper>
        )}
      </AnimatePresence>
      {toggleModal && <MyListModal />}
    </>
  );
}

export default memo(OffCanvasMenu);

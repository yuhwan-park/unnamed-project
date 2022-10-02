// dependencies
import { useRecoilState, useRecoilValue } from 'recoil';
import { memo, useEffect } from 'react';
// components
import UserAccount from './UserAccount';
import ShowAllList from './ShowAllList';
import CalendarList from './CalendarList';
import MyList from './MyList';
import MyListModal from './MyListModal';
// states
import { isWideState, myListModalState, isOffCanvasOpenState } from 'atoms';
// styles
import * as S from './style';
// etc
import { menuVariants } from 'variants';

function OffCanvasMenu() {
  const [IsOffCanvasOpen, setIsOffCanvasOpen] =
    useRecoilState(isOffCanvasOpenState);
  const toggleModal = useRecoilValue(myListModalState);
  const isWide = useRecoilValue(isWideState);

  useEffect(() => {
    setIsOffCanvasOpen(isWide);
  }, [setIsOffCanvasOpen, isWide]);

  return (
    <>
      <S.Wrapper
        key="offCanvas"
        custom={IsOffCanvasOpen}
        variants={menuVariants}
        initial="initial"
        animate="visible"
        transition={{ type: 'tween' }}
      >
        <UserAccount />
        <S.MainMenuContainer>
          <ShowAllList />
          <CalendarList />
        </S.MainMenuContainer>
        <MyList />
      </S.Wrapper>

      {toggleModal && <MyListModal />}
    </>
  );
}

export default memo(OffCanvasMenu);

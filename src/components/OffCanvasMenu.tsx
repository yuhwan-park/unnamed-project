import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toggleMenuState } from 'atoms';
import UserAccount from './offCanvas/UserAccount';
import { menuVariants } from 'variants';
import MyList from './offCanvas/MyList';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function OffCanvasMenu() {
  const navigator = useNavigate();
  const toggleMenu = useRecoilValue(toggleMenuState);

  const onClickDateList = () => {
    navigator('/main');
  };

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
          <DateListContainer onClick={onClickDateList}>
            <FontAwesomeIcon icon={faCalendarDays} />
            <p>날짜별로 보기</p>
          </DateListContainer>
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

const DateListContainer = styled.div`
  display: flex;
  cursor: pointer;
  padding: 20px 10px;
  margin: 0 20px;
  border-radius: 4px;
  &:hover {
    background-color: rgb(230, 230, 230);
  }
  svg {
    color: rgba(0, 0, 0, 0.3);
    padding: 0 10px;
  }
`;

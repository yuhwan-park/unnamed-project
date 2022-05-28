import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { dateState } from '../atoms';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const dateVariants = {
  entry: (isBack: boolean) => ({
    x: isBack ? -100 : 100,
    opacity: 0,
    scale: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? 100 : -100,
    opacity: 0,
    scale: 0,
  }),
};

export default function Nav() {
  const [date, setDate] = useRecoilState(dateState);
  const [isBack, setIsBack] = useState(false);
  const onClickNext = () => {
    setIsBack(false);
    setDate(prev => prev.add(1, 'day'));
  };
  const onClickPrev = () => {
    setIsBack(true);
    setDate(prev => prev.add(-1, 'day'));
  };
  const onClickLogOut = async () => {
    await signOut(auth);
  };
  return (
    <Container>
      <Menu className="fa-solid fa-bars"></Menu>
      <LogOut onClick={onClickLogOut}>LogOut</LogOut>
      <PrevButton
        className="fa-solid fa-angle-left"
        onClick={onClickPrev}
      ></PrevButton>
      <AnimatePresence custom={isBack} initial={false}>
        <Today
          custom={isBack}
          key={date.format('M/D')}
          variants={dateVariants}
          initial="entry"
          animate="visible"
          exit="exit"
          transition={{ type: 'tween' }}
        >
          {date.format('M월 D일')}
        </Today>
      </AnimatePresence>
      <NextButton
        className="fa-solid fa-angle-right"
        onClick={onClickNext}
      ></NextButton>
    </Container>
  );
}

const LogOut = styled.button`
  position: absolute;
  left: 100px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #474747;
`;

const Today = styled(motion.div)`
  position: absolute;
  text-align: center;
  width: 300px;
  padding: 0 55px;
  font-size: 24px;
  color: white;
`;

const Button = styled.i`
  cursor: pointer;
  color: white;
  font-size: 30px;
`;

const PrevButton = styled(Button)`
  position: relative;
  left: -100px;
  z-index: 1;
`;

const NextButton = styled(Button)`
  position: relative;
  right: -100px;
`;

const Menu = styled(Button)`
  position: absolute;
  left: 40px;
`;

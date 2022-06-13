import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { dateState, selectedListState, toggleMenuState } from 'atoms';
import {
  faAngleLeft,
  faBars,
  faAngleRight,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import CalendarView from './common/CalendarView';
import dayjs from 'dayjs';
import { dateVariants } from 'variants';

function Nav({ isWide }: { isWide: boolean }) {
  const [date, setDate] = useRecoilState(dateState);
  const [isBack, setIsBack] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const setToggleMenu = useSetRecoilState(toggleMenuState);
  const myList = useRecoilValue(selectedListState);
  const navigator = useNavigate();

  const onClickNext = () => {
    setIsBack(false);
    setDate(prev => prev.add(1, 'day'));
    navigator('/main');
  };

  const onClickPrev = () => {
    setIsBack(true);
    setDate(prev => prev.add(-1, 'day'));
    navigator('/main');
  };

  const onClickMenuIcon = () => {
    setToggleMenu(prev => !prev);
  };

  const onMouseEnterToday = () => {
    setIsHovered(true);
  };
  const onMouseLeaveToday = () => {
    setIsHovered(false);
  };

  const onClickCalendar = () => {
    setToggleCalendar(prev => !prev);
  };

  const onClickDay = (value: Date) => {
    setDate(dayjs(value));
    setToggleCalendar(false);
  };

  useEffect(() => {
    if (isWide) {
      setToggleMenu(true);
    } else {
      setToggleMenu(false);
    }
  }, [setToggleMenu, isWide]);

  return (
    <Wrapper>
      <MenuIcon onClick={onClickMenuIcon}>
        <FontAwesomeIcon icon={faBars} />
      </MenuIcon>
      {myList ? (
        <Today>{myList.title}</Today>
      ) : (
        <>
          <PrevButton onClick={onClickPrev}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </PrevButton>
          <AnimatePresence custom={isBack} initial={false}>
            <Today
              custom={isBack}
              key={date.format('M/D')}
              variants={dateVariants}
              initial="entry"
              animate="visible"
              exit="exit"
              transition={{ type: 'tween' }}
              onMouseEnter={onMouseEnterToday}
              onMouseLeave={onMouseLeaveToday}
            >
              {isHovered ? (
                <Button>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    onClick={onClickCalendar}
                  />
                </Button>
              ) : (
                <div>{date.format('M월 D일')}</div>
              )}
            </Today>
          </AnimatePresence>
          <NextButton onClick={onClickNext}>
            <FontAwesomeIcon icon={faAngleRight} />
          </NextButton>

          {toggleCalendar && (
            <CalendarContainer>
              <CalendarView value={date.toDate()} onClickDay={onClickDay} />
            </CalendarContainer>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default React.memo(Nav);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #474747;
`;

const Today = styled(motion.div)`
  position: absolute;
  text-align: center;
  padding: 0 55px;
  font-size: 18px;
  color: white;
  font-family: ${props => props.theme.fontFamily.main};
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: 40px;
  z-index: 300;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
`;

const Button = styled.div`
  svg {
    cursor: pointer;
    color: white;
    font-size: 30px;
  }
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

const MenuIcon = styled(Button)`
  position: absolute;
  left: 30px;
  z-index: 10;
  padding-right: 10px;
`;

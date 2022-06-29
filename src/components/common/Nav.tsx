// dependencies
import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  faAngleLeft,
  faBars,
  faAngleRight,
  faCalendarDays,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';

// components
import ComplaintForm from './ComplaintForm';
import CalendarView from './CalendarView';

// states
import {
  dateState,
  screenStatusState,
  selectedListState,
  toggleMenuState,
} from 'atoms';

// sources
import { dateVariants } from 'variants';
import { useDetectClickOutside } from 'hooks/useDetectClickOutside';

// styles
import { devices } from 'style/media-queries';

function Nav() {
  const [date, setDate] = useRecoilState(dateState);
  const [isBack, setIsBack] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [toggleIssue, setToggleIssue] = useState(false);
  const selectedList = useRecoilValue(selectedListState);
  const screenStatus = useRecoilValue(screenStatusState);
  const setToggleMenu = useSetRecoilState(toggleMenuState);
  const closeCalendar = useCallback(() => {
    setToggleCalendar(false);
  }, []);
  const calendarRef = useDetectClickOutside({ onTriggered: closeCalendar });

  const closeIssueForm = useCallback(() => {
    setToggleIssue(false);
  }, []);
  const issueRef = useDetectClickOutside({ onTriggered: closeIssueForm });

  const onClickNext = () => {
    setIsBack(false);
    setDate(prev => prev.add(1, 'day'));
  };

  const onClickPrev = () => {
    setIsBack(true);
    setDate(prev => prev.add(-1, 'day'));
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

  const onClickIssueButton = () => {
    setToggleIssue(prev => !prev);
  };

  return (
    <Wrapper ref={calendarRef}>
      <MenuIcon onClick={onClickMenuIcon} data-testid="menu-toggle-button">
        <FontAwesomeIcon icon={faBars} />
      </MenuIcon>
      {selectedList ? (
        <Today>{selectedList.title}</Today>
      ) : screenStatus === 'All' ? (
        <Today>모두 보기</Today>
      ) : (
        <>
          <PrevButton onClick={onClickPrev} data-testid="prev-button">
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
                <Button data-testid="calendar-button" onClick={onClickCalendar}>
                  <FontAwesomeIcon icon={faCalendarDays} />
                </Button>
              ) : (
                <div>{date.format('M월 D일')}</div>
              )}
            </Today>
          </AnimatePresence>
          <NextButton onClick={onClickNext} data-testid="next-button">
            <FontAwesomeIcon icon={faAngleRight} />
          </NextButton>

          {toggleCalendar && (
            <CalendarContainer data-testid="calendar">
              <CalendarView value={date.toDate()} onClickDay={onClickDay} />
            </CalendarContainer>
          )}
        </>
      )}
      <ComplaintContainer ref={issueRef}>
        <Button onClick={onClickIssueButton} data-testid="issue-button">
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </Button>
        {toggleIssue && (
          <ComplaintForm toggleFunc={(bool: boolean) => setToggleIssue(bool)} />
        )}
      </ComplaintContainer>
    </Wrapper>
  );
}

export default memo(Nav);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #474747;
`;

const Today = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 200px;
  height: 50px;
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
  @media ${devices.mobileL} {
    left: -70px;
  }
`;

const NextButton = styled(Button)`
  position: relative;
  right: -100px;
  @media ${devices.mobileL} {
    right: -70px;
  }
`;

const MenuIcon = styled(Button)`
  position: absolute;
  left: 30px;
  z-index: 10;
  padding-right: 10px;
`;

const ComplaintContainer = styled.div`
  position: absolute;
  right: 0;
  padding: 0 10px;
`;

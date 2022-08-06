// dependencies
import { memo, useCallback, useState } from 'react';
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
import { AnimatePresence } from 'framer-motion';
// components
import CalendarView from '../CalendarView';
import ComplaintForm from '../ComplaintForm';
// states
import {
  dateState,
  screenStatusState,
  selectedListState,
  toggleMenuState,
} from 'atoms';
// hooks
import { useDetectClickOutside } from 'hooks';
// sources
import { dateVariants } from 'variants';
// styles
import * as S from './style';

function Header() {
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
    <S.Wrapper ref={calendarRef}>
      <S.MenuIcon onClick={onClickMenuIcon} data-testid="menu-toggle-button">
        <FontAwesomeIcon icon={faBars} />
      </S.MenuIcon>
      {selectedList ? (
        <S.Today>{selectedList.title}</S.Today>
      ) : screenStatus === 'All' ? (
        <S.Today>모두 보기</S.Today>
      ) : (
        <>
          <S.PrevButton onClick={onClickPrev} data-testid="prev-button">
            <FontAwesomeIcon icon={faAngleLeft} />
          </S.PrevButton>
          <AnimatePresence custom={isBack} initial={false}>
            <S.Today
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
                <S.Button
                  data-testid="calendar-button"
                  onClick={onClickCalendar}
                >
                  <FontAwesomeIcon icon={faCalendarDays} />
                </S.Button>
              ) : (
                <div>{date.format('M월 D일')}</div>
              )}
            </S.Today>
          </AnimatePresence>
          <S.NextButton onClick={onClickNext} data-testid="next-button">
            <FontAwesomeIcon icon={faAngleRight} />
          </S.NextButton>

          {toggleCalendar && (
            <S.CalendarContainer data-testid="calendar">
              <CalendarView value={date.toDate()} onClickDay={onClickDay} />
            </S.CalendarContainer>
          )}
        </>
      )}
      <S.ComplaintContainer ref={issueRef}>
        <S.Button onClick={onClickIssueButton} data-testid="issue-button">
          <FontAwesomeIcon icon={faTriangleExclamation} />
        </S.Button>
        {toggleIssue && (
          <ComplaintForm toggleFunc={(bool: boolean) => setToggleIssue(bool)} />
        )}
      </S.ComplaintContainer>
    </S.Wrapper>
  );
}

export default memo(Header);

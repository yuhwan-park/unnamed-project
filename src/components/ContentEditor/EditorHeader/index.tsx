// dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faArrowLeftLong,
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
// components
import CheckBox from 'components/common/CheckBox';
import CalendarView from 'components/common/CalendarView';
import ListMenu from 'components/TodoList/ListMenu';
// states
import {
  selectedDocumentState,
  isWideState,
  showEditorState,
  docIdsByDateState,
} from 'atoms';
// firebase
import { arrayRemove, arrayUnion, setDoc } from 'firebase/firestore';
// hooks
import { useUpdateTodo } from 'hooks';
// styles
import * as S from './style';
// utils
import { docRef } from 'utils';

function EditorHeader() {
  const selectedDoc = useRecoilValue(selectedDocumentState);
  const isWide = useRecoilValue(isWideState);
  const [newDate, setNewDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const setDocIdsByDate = useSetRecoilState(docIdsByDateState);
  const setShowEditor = useSetRecoilState(showEditorState);
  const updator = useUpdateTodo();
  const calendarRef = useRef<HTMLDivElement>(null);

  const onClickToggleCalendar = () => {
    setShowCalendar(prev => !prev);
  };

  const onClickDay = (value: Date) => {
    setNewDate(dayjs(value).format('YYYYMMDD'));
  };

  const onClickGoBack = () => {
    setShowEditor(false);
  };

  const onClickConfirmToUpdateDate = async () => {
    if (!selectedDoc || !newDate || newDate === selectedDoc.date) return;

    setShowCalendar(false);

    if (selectedDoc.date) {
      setDocIdsByDate(ids => ({
        ...ids,
        [selectedDoc.date]: ids[selectedDoc.date].filter(
          id => id !== selectedDoc.id,
        ),
        [newDate]: ids[newDate]
          ? [...ids[newDate], selectedDoc.id]
          : [selectedDoc.id],
      }));
      await setDoc(
        docRef('Date'),
        { [selectedDoc.date]: arrayRemove(selectedDoc.id) },
        { merge: true },
      );
    }

    await updator(selectedDoc, 'date', newDate);
    await setDoc(
      docRef('Date'),
      { [newDate]: arrayUnion(selectedDoc.id) },
      { merge: true },
    );
  };

  useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => document.removeEventListener('mousedown', handleClickOutSide);
  }, []);

  return (
    <>
      {selectedDoc && (
        <>
          <S.Wrapper>
            <S.FrontMenuContainer>
              {!isWide && (
                <FontAwesomeIcon
                  onClick={onClickGoBack}
                  icon={faArrowLeftLong}
                  className="go-back-icon"
                  size="lg"
                />
              )}
              {!selectedDoc.isNote && <CheckBox todo={selectedDoc} />}
            </S.FrontMenuContainer>
            <S.CalendarIconContainer onClick={onClickToggleCalendar}>
              <FontAwesomeIcon icon={faCalendarDays} size="lg" />
              <span>
                {selectedDoc.date
                  ? dayjs(selectedDoc.date).format('M월D일')
                  : '없음'}
              </span>
            </S.CalendarIconContainer>
            {showCalendar && (
              <S.CalendarContainer ref={calendarRef}>
                <CalendarView
                  value={
                    selectedDoc.date ? dayjs(selectedDoc.date).toDate() : null
                  }
                  onClickDay={onClickDay}
                />
                <S.ButtonContainer>
                  <S.SubmitButton
                    type="button"
                    value="확인"
                    onClick={onClickConfirmToUpdateDate}
                  />
                  <S.CancleButton
                    type="button"
                    value="취소"
                    onClick={onClickToggleCalendar}
                  />
                </S.ButtonContainer>
              </S.CalendarContainer>
            )}
            <S.BackMenuContainer>
              <ListMenu item={selectedDoc} isEditor={true} />
            </S.BackMenuContainer>
          </S.Wrapper>

          <S.EditorTitleContainer>
            <S.EditorTitle>{selectedDoc?.title}</S.EditorTitle>
          </S.EditorTitleContainer>
        </>
      )}
    </>
  );
}

export default EditorHeader;

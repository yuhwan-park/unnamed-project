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
  dateState,
  isWideState,
  showEditorState,
} from 'atoms';
// firebase
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db } from 'firebase-source';
// hooks
import { useUpdateDocs, useSetDocCount } from 'hooks';
// styles
import * as S from './style';

function EditorHeader() {
  const selectedDoc = useRecoilValue(selectedDocumentState);
  const isWide = useRecoilValue(isWideState);
  const setDate = useSetRecoilState(dateState);
  const setShowEditor = useSetRecoilState(showEditorState);
  const [showCalendar, setShowCalendar] = useState(false);
  const [newDate, setNewDate] = useState('');
  const setDocCount = useSetDocCount();
  const updator = useUpdateDocs();
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
    await updator(selectedDoc, 'date', newDate, true);

    if (selectedDoc.date) {
      const oldDocRef = doc(
        db,
        `${auth.currentUser?.uid}/${selectedDoc.date}/Document/${selectedDoc.id}`,
      );
      await setDocCount(selectedDoc.date, 'Minus');
      await deleteDoc(oldDocRef);
    }
    await setDocCount(newDate, 'Plus');

    const newDocRef = doc(
      db,
      `${auth.currentUser?.uid}/${newDate}/Document/${selectedDoc.id}`,
    );
    const newItem = { ...selectedDoc, date: newDate };
    await setDoc(newDocRef, newItem);
    setDate(dayjs(newDate));
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

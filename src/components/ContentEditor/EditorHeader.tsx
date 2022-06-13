import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { selectedDocumentState, dateState } from 'atoms';
import CheckBox from 'components/common/CheckBox';
import ListMenu from 'components/list/ListMenu';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { CancleButton, SubmitButton } from 'style/main-page';
import { useUpdateDocs } from 'hooks';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db } from 'firebase-source';
import CalendarView from 'components/common/CalendarView';

function EditorHeader() {
  const selectedDoc = useRecoilValue(selectedDocumentState);
  const setDate = useSetRecoilState(dateState);
  const [showCalendar, setShowCalendar] = useState(false);
  const [newDate, setNewDate] = useState('');
  const updator = useUpdateDocs();
  const calendarRef = useRef<HTMLDivElement>(null);

  const onClickToggleCalendar = () => {
    setShowCalendar(prev => !prev);
  };

  const onClickDay = (value: Date) => {
    setNewDate(dayjs(value).format('YYYYMMDD'));
  };

  const onClickConfirmToUpdateDate = async () => {
    if (!selectedDoc || !newDate || newDate === selectedDoc.date) return;

    await updator(selectedDoc, 'date', newDate, true);

    if (selectedDoc.date) {
      const oldDocRef = doc(
        db,
        `${auth.currentUser?.uid}/${selectedDoc.date}/Document/${selectedDoc.id}`,
      );
      await deleteDoc(oldDocRef);
    }

    const newMyListDocRef = doc(
      db,
      `${auth.currentUser?.uid}/${newDate}/Document/${selectedDoc.id}`,
    );
    const newItem = { ...selectedDoc, date: newDate };
    await setDoc(newMyListDocRef, newItem);
    setDate(dayjs(newDate));
    setShowCalendar(false);
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
          <Wrapper>
            <FrontMenuContainer>
              {!selectedDoc.isNote && <CheckBox todo={selectedDoc} />}
            </FrontMenuContainer>
            <CalendarIconContainer>
              <FontAwesomeIcon
                icon={faCalendarDays}
                onClick={onClickToggleCalendar}
                size="lg"
              />
            </CalendarIconContainer>
            {showCalendar && (
              <CalendarContainer ref={calendarRef}>
                <CalendarView
                  value={
                    selectedDoc.date ? dayjs(selectedDoc.date).toDate() : null
                  }
                  onClickDay={onClickDay}
                />
                <ButtonContainer>
                  <SubmitButton
                    type="button"
                    value="확인"
                    onClick={onClickConfirmToUpdateDate}
                  />
                  <CancleButton
                    type="button"
                    value="취소"
                    onClick={onClickToggleCalendar}
                  />
                </ButtonContainer>
              </CalendarContainer>
            )}
            <BackMenuContainer>
              <ListMenu item={selectedDoc} isEditor={true} />
            </BackMenuContainer>
          </Wrapper>

          <EditorTitleContainer>
            <EditorTitle>{selectedDoc?.title}</EditorTitle>
          </EditorTitleContainer>
        </>
      )}
    </>
  );
}

export default EditorHeader;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const FrontMenuContainer = styled.div`
  padding-right: 5px;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
`;

const BackMenuContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  margin-right: 10px;
  .toggle-menu-icon {
    opacity: 1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 40px;
  z-index: 300;
  background-color: white;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
`;

const EditorTitleContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`;

const EditorTitle = styled.div`
  width: 100%;
  padding: 5px 10px;
  font-weight: 700;
`;

const CalendarIconContainer = styled.div`
  color: #bbb;
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
`;

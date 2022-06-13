import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { selectedDocumentState } from 'atoms';
import CheckBox from 'components/common/CheckBox';
import ListMenu from 'components/list/ListMenu';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'style/calendar.css';
import dayjs from 'dayjs';
import { CancleButton, SubmitButton } from 'style/main-page';

function EditorHeader() {
  const document = useRecoilValue(selectedDocumentState);
  const [showCalendar, setShowCalendar] = useState(false);
  const [stateDate, setStateDate] = useState(document?.date);

  const onClickCalendar = () => {
    setShowCalendar(true);
  };

  const onClickCloseCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <>
      {document && (
        <>
          <Wrapper>
            <FrontMenuContainer>
              {!document.isNote && <CheckBox todo={document} />}
            </FrontMenuContainer>
            <FontAwesomeIcon icon={faCalendarDays} onClick={onClickCalendar} />
            {showCalendar && (
              <CalendarContainer>
                <Calendar
                  formatDay={(locale, date) => dayjs(date).format('D')}
                  value={stateDate ? dayjs(stateDate).toDate() : null}
                  minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                  maxDetail="month"
                  calendarType="US"
                  showNeighboringMonth={false}
                  onClickDay={(value, event) =>
                    alert(`Clicked day: ${dayjs(value).format('YYYY-MM-DD')}`)
                  }
                />
                <ButtonContainer>
                  <SubmitButton
                    type="button"
                    value="확인"
                    onClick={onClickCloseCalendar}
                  />
                  <CancleButton
                    type="button"
                    value="취소"
                    onClick={onClickCloseCalendar}
                  />
                </ButtonContainer>
              </CalendarContainer>
            )}

            <BackMenuContainer>
              <ListMenu item={document} isEditor={true} />
            </BackMenuContainer>
          </Wrapper>
          <EditorTitleContainer>
            <EditorTitle>{document?.title}</EditorTitle>
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

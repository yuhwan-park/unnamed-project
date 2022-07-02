import { documentCountByDateState } from 'atoms';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import { useRecoilValue } from 'recoil';
import 'style/calendar.css';
import styled from 'styled-components';

interface ICalendarViewProps {
  value: Date | null;
  onClickDay: (value: Date) => void;
}

function CalendarView({ value, onClickDay }: ICalendarViewProps) {
  const docCount = useRecoilValue(documentCountByDateState);
  return (
    <Calendar
      formatDay={(locale, date) => dayjs(date).format('D')}
      value={value}
      minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      maxDetail="month"
      calendarType="US"
      showNeighboringMonth={false}
      onClickDay={onClickDay}
      tileContent={({ date, view }) => {
        const dateString = dayjs(date).format('YYYYMMDD');
        if (docCount && docCount[dateString]) {
          return <Count>{`(${docCount[dateString]})`}</Count>;
        }
        return null;
      }}
    />
  );
}

export default CalendarView;

const Count = styled.div`
  position: absolute;
  width: calc(100% - 13px);
  text-align: center;
  font-size: 8px;
`;

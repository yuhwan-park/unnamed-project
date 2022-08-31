// dependencies
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import { useRecoilValue } from 'recoil';
// states
import { docIdsByDateState } from 'atoms';
// styles
import 'style/calendar.css';
import * as S from './style';

interface ICalendarViewProps {
  value: Date | null;
  onClickDay: (value: Date) => void;
}

function CalendarView({ value, onClickDay }: ICalendarViewProps) {
  const docIdsByDate = useRecoilValue(docIdsByDateState);
  return (
    <Calendar
      formatDay={(locale, date) => dayjs(date).format('D')}
      value={value}
      minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      maxDetail="month"
      calendarType="US"
      showNeighboringMonth={false}
      onClickDay={onClickDay}
      tileContent={({ date }) => {
        const dateString = dayjs(date).format('YYYYMMDD');
        if (docIdsByDate[dateString] && docIdsByDate[dateString].length) {
          return <S.Count>{`(${docIdsByDate[dateString].length})`}</S.Count>;
        }
        return null;
      }}
    />
  );
}

export default CalendarView;

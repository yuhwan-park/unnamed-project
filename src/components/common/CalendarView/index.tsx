// dependencies
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import { useRecoilValue } from 'recoil';
// states
import { documentCountByDateState } from 'atoms';
// styles
import 'style/calendar.css';
import * as S from './style';

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
          return <S.Count>{`(${docCount[dateString]})`}</S.Count>;
        }
        return null;
      }}
    />
  );
}

export default CalendarView;

import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import 'style/calendar.css';

interface ICalendarViewProps {
  value: Date | null;
  onClickDay: (value: Date) => void;
}

function CalendarView({ value, onClickDay }: ICalendarViewProps) {
  return (
    <Calendar
      formatDay={(locale, date) => dayjs(date).format('D')}
      value={value}
      minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      maxDetail="month"
      calendarType="US"
      showNeighboringMonth={false}
      onClickDay={onClickDay}
    />
  );
}

export default CalendarView;

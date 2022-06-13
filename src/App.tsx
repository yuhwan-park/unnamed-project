import Router from 'Router';
import dayjs from 'dayjs';
import locale_ko from 'dayjs/locale/ko';

function App() {
  dayjs.locale(locale_ko); // dayjs locale

  return <Router />;
}

export default App;

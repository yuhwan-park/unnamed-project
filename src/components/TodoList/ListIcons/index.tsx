// dependencies
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
// states
import { dateState, screenStatusState } from 'atoms';
// types
import { Document } from '@types';
// styles
import * as S from './style';

interface IListIconsProps {
  item: Document;
}

function ListIcons({ item }: IListIconsProps) {
  const navigator = useNavigate();
  const setDate = useSetRecoilState(dateState);
  const [screenStatus, setScreenStatus] = useRecoilState(screenStatusState);

  const onClickListTitle = () => {
    navigator(`/main/lists/${item.list?.id}/tasks`);
    setScreenStatus('List');
  };
  const onClickDate = () => {
    setDate(dayjs(item.date));
    navigator(`/main`);
    setScreenStatus('Date');
  };

  return (
    <>
      {item.list && screenStatus !== 'List' && (
        <S.ListItemText onClick={onClickListTitle}>
          {item.list.title}
        </S.ListItemText>
      )}
      {item.date && screenStatus !== 'Date' && (
        <S.ListItemText onClick={onClickDate}>
          {dayjs(item.date).format('M월D일')}
        </S.ListItemText>
      )}
      {item.content && (
        <FontAwesomeIcon
          icon={faSquarePollHorizontal}
          style={{ color: '#bbb' }}
          size="sm"
        />
      )}
    </>
  );
}

export default ListIcons;

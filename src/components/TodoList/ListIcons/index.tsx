// dependencies
import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// states
import { dateState, myListsState, screenStatusState } from 'atoms';
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
  const myLists = useRecoilValue(myListsState);

  const onClickListTitle = () => {
    navigator(`/main/lists/${myLists[item.listId].id}/tasks`);
    setScreenStatus('List');
  };
  const onClickDate = () => {
    setDate(dayjs(item.date));
    navigator(`/main`);
    setScreenStatus('Date');
  };

  return (
    <>
      {item.listId && screenStatus !== 'List' && (
        <S.ListItemText onClick={onClickListTitle}>
          {myLists[item.listId].title}
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

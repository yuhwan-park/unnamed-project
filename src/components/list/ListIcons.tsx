import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dateState, paramState } from 'atoms';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IDocument } from 'types';

interface IListIconsProps {
  item: IDocument;
}

function ListIcons({ item }: IListIconsProps) {
  const navigator = useNavigate();
  const setDate = useSetRecoilState(dateState);
  const params = useRecoilValue(paramState);
  const { pathname } = useLocation();

  const onClickListTitle = () => {
    navigator(`/main/lists/${item.list?.id}/tasks`);
  };
  const onClickDate = () => {
    setDate(dayjs(item.date));
    navigator(`/main`);
  };

  return (
    <>
      {item.list && !params['listId'] && (
        <ListItemText onClick={onClickListTitle}>
          {item.list.title}
        </ListItemText>
      )}
      {item.date && (params['listId'] || pathname.includes('all')) && (
        <ListItemText onClick={onClickDate}>
          {dayjs(item.date).format('M월D일')}
        </ListItemText>
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

const ListItemText = styled.div`
  text-align: right;
  font-size: ${props => props.theme.fontSize.small};
  color: rgba(0, 0, 0, 0.4);
  ${({ theme }) => theme.textEllipsis};
  width: fit-content;
  min-width: 60px;
  max-width: 100px;
  padding: 0 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

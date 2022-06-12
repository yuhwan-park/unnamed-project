import { faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { paramState } from 'atoms';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { IDocument } from 'types';

interface IListIconsProps {
  item: IDocument;
}

function ListIcons({ item }: IListIconsProps) {
  const navigator = useNavigate();
  const params = useRecoilValue(paramState);

  const onClickListTitle = () => {
    navigator(`/main/lists/${item.list?.id}/tasks`);
  };

  return (
    <>
      {item.list && !params['listId'] && (
        <MyListTitle onClick={onClickListTitle}>{item.list.title}</MyListTitle>
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

const MyListTitle = styled.div`
  text-align: right;
  font-size: ${props => props.theme.fontSize.small};
  color: rgba(0, 0, 0, 0.4);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 15%;
  max-width: 100px;
  padding: 0 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

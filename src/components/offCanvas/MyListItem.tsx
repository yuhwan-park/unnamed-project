import { IMyList } from 'types';

interface IMyListItemProps {
  list: IMyList;
}

function MyListItem({ list }: IMyListItemProps) {
  return <div>{list.title}</div>;
}

export default MyListItem;

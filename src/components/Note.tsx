import { DocumentData } from 'firebase/firestore';
import styled from 'styled-components';
import ListMenu from './ListMenu';

export default function Note({ note }: DocumentData) {
  return (
    <List>
      <span>{note.title}</span>
      <ListMenu document={note} />
    </List>
  );
}

const List = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  margin-bottom: 6px;
  cursor: pointer;
  &:hover {
    .fa-ellipsis {
      opacity: 1;
    }
  }
`;

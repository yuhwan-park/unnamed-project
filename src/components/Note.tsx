import { DocumentData } from 'firebase/firestore';
import styled from 'styled-components';
import ListMenu from './ListMenu';

export default function Note({ note }: DocumentData) {
  return (
    <List>
      <IconContainer>
        <i className="fa-solid fa-note-sticky"></i>
      </IconContainer>
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

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  i {
    color: rgba(0, 0, 0, 0.3);
    font-size: 20px;
  }
`;

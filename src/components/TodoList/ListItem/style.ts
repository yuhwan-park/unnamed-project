import { IconContainer, Title } from 'style/main-page';
import styled from 'styled-components';

export { ListItemContainer } from 'style/main-page';

export const ToDoTitle = styled(Title)<{ isDone: boolean }>`
  color: ${props => (props.isDone ? '#bbb' : 'black')};
`;

export const NoteIconContainer = styled(IconContainer)`
  z-index: 1;
  .sub-icon {
    color: ${({ theme }) => theme.iconColor};
    width: 20px;
  }
`;

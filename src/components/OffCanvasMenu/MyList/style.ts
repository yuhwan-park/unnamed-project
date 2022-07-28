import styled from 'styled-components';
import { ListHeader } from 'style/main-page';

export const MyListContainer = styled.div`
  padding: 10px 20px 100px 10px;
  margin-bottom: 40px;
`;

export const ListTitle = styled.div`
  display: flex;
  font-size: ${props => props.theme.fontSize.small};
`;

export const MyListHeader = styled(ListHeader)`
  justify-content: space-between;
  .plus-button {
    padding: 0 5px;
  }
`;

export const MyListContent = styled.ul`
  height: fit-content;
`;

export const EmptyContent = styled.div`
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.4);
  font-size: ${props => props.theme.fontSize.small};
  line-height: 16px;
  min-width: 200px;
`;

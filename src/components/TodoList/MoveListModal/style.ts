import styled from 'styled-components';

export { MenuIcon } from 'style/main-page';

export const Wrapper = styled.ul`
  position: absolute;
  right: 205px;
  width: 150px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 9999;
`;

export const MyListContainer = styled.li`
  display: flex;
  padding: 8px 0;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;

export const MyListTitle = styled.p`
  width: 100%;
  ${({ theme }) => theme.textEllipsis};
  font-size: ${props => props.theme.fontSize.medium};
`;

export const CheckIconContainer = styled.div`
  position: relative;
  right: 0;
  padding: 0 8px;
  color: #bbb;
`;

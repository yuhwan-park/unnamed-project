import styled from 'styled-components';

export const ListItemText = styled.div`
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

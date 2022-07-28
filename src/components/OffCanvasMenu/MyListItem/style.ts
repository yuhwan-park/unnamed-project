import styled from 'styled-components';

export { MenuIcon } from 'style/main-page';

export const Wrapper = styled.li<{ isSelected: boolean }>`
  position: relative;
  display: flex;
  padding: 10px 0;
  border-radius: 4px;
  background-color: ${props =>
    props.isSelected ? 'rgb(210, 210, 210)' : 'transparent'};
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.isSelected ? 'rgb(210, 210, 210)' : 'rgb(230, 230, 230)'};
    .toggle-menu-icon {
      opacity: 1;
    }
  }
  p {
    ${({ theme }) => theme.textEllipsis};
    width: 100%;
  }
`;

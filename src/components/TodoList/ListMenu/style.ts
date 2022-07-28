import styled from 'styled-components';

export { MenuButtonContainer, MenuContainer, MenuModal } from 'style/main-page';

export const ListMenuIconContainer = styled.div<{ isEditor: boolean }>`
  .toggle-menu-icon {
    opacity: ${props => (props.isEditor ? 1 : 0)};
  }
`;

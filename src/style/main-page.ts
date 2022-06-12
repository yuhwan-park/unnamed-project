import styled from 'styled-components';

export const ListItemContainer = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  margin-bottom: 6px;
  &:hover {
    .toggle-menu-icon {
      opacity: 1;
    }
  }
`;

export const Title = styled.input`
  width: 100%;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const MenuContainer = styled.div`
  position: relative;
  cursor: pointer;
  .toggle-menu-icon {
    padding: 0 10px;
    color: rgba(0, 0, 0, 0.3);
    &:hover {
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 0 5px 0 10px;
`;

export const MenuButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  span {
    font-size: ${props => props.theme.fontSize.medium};
  }
  .sub-icon {
    color: #bbb;
    width: 20px;
    padding-right: 10px;
  }
`;

export const MenuModal = styled.div`
  position: absolute;
  right: 0px;
  width: 200px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 9999;
`;

export const MenuIcon = styled.div`
  svg {
    color: rgba(0, 0, 0, 0.3);
    padding: 0 10px;
  }
`;

import styled from 'styled-components';

export const ListItemContainer = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  margin-bottom: 6px;
  &:hover {
    .fa-ellipsis {
      opacity: 1;
    }
  }
`;

export const Title = styled.input`
  position: absolute;
  left: 0;
  width: 100%;
  padding: 0 30px;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const MenuContainer = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
  .toggle-menu-icon {
    padding: 0 10px;
    opacity: 0;
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
  width: 30px;
  height: 30px;
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
  right: -30px;
  width: 200px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

export const MenuIcon = styled.div`
  svg {
    color: rgba(0, 0, 0, 0.3);
    padding-right: 10px;
  }
`;

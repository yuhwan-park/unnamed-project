import { devices } from 'style/media-queries';
import styled from 'styled-components';

export { CancleButton, SubmitButton } from 'style/main-page';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

export const FrontMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  .go-back-icon {
    color: #bbb;
    padding: 0 10px;
    cursor: pointer;
  }
`;

export const BackMenuContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  margin-right: 10px;
  .toggle-menu-icon {
    opacity: 1;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

export const CalendarContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 40px;
  z-index: 300;
  background-color: white;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  @media ${devices.laptop} {
    left: -50px;
  }
`;

export const EditorTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const EditorTitle = styled.div`
  width: 100%;
  padding: 10px;
  font-weight: 700;
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const CalendarIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  svg {
    color: rgba(0, 0, 0, 0.5);
  }
  span {
    padding-left: 5px;
    font-size: ${props => props.theme.fontSize.small};
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

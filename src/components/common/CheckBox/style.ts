import styled from 'styled-components';

export { IconContainer } from 'style/main-page';

export const CheckBoxContainer = styled.div<{
  isDone: boolean;
  priority: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: ${props =>
    props.isDone
      ? 'none'
      : props.priority === 1
      ? '2px solid rgba(255,0,0,0.5)'
      : props.priority === 2
      ? '2px solid rgba(0,0,255,0.5)'
      : props.priority === 3
      ? '2px solid rgba(0,153,76,0.5)'
      : '2px solid rgba(0, 0, 0, 0.1)'};
  z-index: 1;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props =>
    props.isDone ? 'rgba(0, 0, 0, 0.2)' : 'transparent'};
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

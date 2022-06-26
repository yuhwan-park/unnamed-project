import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { IconContainer } from 'style/main-page';
import styled from 'styled-components';
import { useUpdateDocs } from 'hooks';
import { IDocument } from 'types';
import { memo } from 'react';

interface ICheckBoxProps {
  todo: IDocument;
}

function CheckBox({ todo }: ICheckBoxProps) {
  const updator = useUpdateDocs();

  const onClickCheckBox = async () => {
    await updator(todo, 'isDone', !todo.isDone, true);
  };

  return (
    <IconContainer className="show-editor-trigger">
      <CheckBoxContainer
        className="check-box"
        onClick={onClickCheckBox}
        isDone={todo.isDone}
        priority={todo.priority}
      >
        {todo.isDone ? <FontAwesomeIcon icon={faCheck} inverse /> : null}
      </CheckBoxContainer>
    </IconContainer>
  );
}

export default memo(CheckBox);

const CheckBoxContainer = styled.div<{ isDone: boolean; priority: number }>`
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

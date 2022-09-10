// dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react';
// hooks
import { useUpdateTodo } from 'hooks';
// types
import { Document } from '@types';
// styles
import * as S from './style';

interface ICheckBoxProps {
  todo: Document;
}

function CheckBox({ todo }: ICheckBoxProps) {
  const updator = useUpdateTodo();

  const onClickCheckBox = async () => {
    await updator(todo, 'isDone', !todo.isDone);
  };

  return (
    <S.IconContainer className="show-editor-trigger">
      <S.CheckBoxContainer
        className="check-box"
        onClick={onClickCheckBox}
        isDone={todo.isDone}
        priority={todo.priority}
      >
        {todo.isDone ? <FontAwesomeIcon icon={faCheck} inverse /> : null}
      </S.CheckBoxContainer>
    </S.IconContainer>
  );
}

export default memo(CheckBox);

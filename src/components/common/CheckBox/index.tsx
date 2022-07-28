// dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react';
// hooks
import { useUpdateDocs } from 'hooks';
// types
import { IDocument } from 'types';
// styles
import * as S from './style';

interface ICheckBoxProps {
  todo: IDocument;
}

function CheckBox({ todo }: ICheckBoxProps) {
  const updator = useUpdateDocs();

  const onClickCheckBox = async () => {
    await updator(todo, 'isDone', !todo.isDone, true);
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

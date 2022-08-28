// dependencies
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// hooks
import { useUpdateTodo } from 'hooks';
// types
import { IDocument } from 'types';
// styles
import * as S from './style';

interface IPriorityFlagProps {
  todo: IDocument;
  toggleMenu: () => void;
}

function PriorityFlag({ todo, toggleMenu }: IPriorityFlagProps) {
  const updator = useUpdateTodo();

  const onClickFlag = async (priority: number) => {
    toggleMenu();
    await updator(todo, 'priority', priority);
  };

  return (
    <S.Wrapper>
      <S.FlagLabel htmlFor="flagContainer">우선도</S.FlagLabel>
      <S.FlagContainer id="flagContainer">
        <FontAwesomeIcon
          icon={faFlag}
          style={{ color: 'red' }}
          onClick={() => onClickFlag(1)}
        />
        <FontAwesomeIcon
          icon={faFlag}
          style={{ color: 'blue' }}
          onClick={() => onClickFlag(2)}
        />
        <FontAwesomeIcon
          icon={faFlag}
          style={{ color: 'green' }}
          onClick={() => onClickFlag(3)}
        />
        <FontAwesomeIcon
          icon={faFlag}
          style={{ color: 'lightgray' }}
          onClick={() => onClickFlag(4)}
        />
      </S.FlagContainer>
    </S.Wrapper>
  );
}

export default PriorityFlag;

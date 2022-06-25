import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUpdateDocs } from 'hooks';
import styled from 'styled-components';
import { IDocument } from 'types';

interface IPriorityFlagProps {
  todo: IDocument;
  toggleMenu: () => void;
}

function PriorityFlag({ todo, toggleMenu }: IPriorityFlagProps) {
  const updator = useUpdateDocs();

  const onClickFlag = async (priority: number) => {
    toggleMenu();
    await updator(todo, 'priority', priority, true);
  };

  return (
    <Wrapper>
      <FlagLabel htmlFor="flagContainer">우선도</FlagLabel>
      <FlagContainer id="flagContainer">
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
      </FlagContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const FlagContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  svg {
    padding: 10px;
    &:hover {
      background-color: rgb(240, 240, 240);
    }
  }
`;

const FlagLabel = styled.label`
  font-size: ${props => props.theme.fontSize.small};
  color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
`;

export default PriorityFlag;

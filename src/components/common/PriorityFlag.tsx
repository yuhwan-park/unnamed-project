import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DocumentData, updateDoc } from 'firebase/firestore';
import { useGetDocRef, useGetListDocRef, useUpdateDocs } from 'hooks';
import styled from 'styled-components';

function PriorityFlag({ todo }: { todo: DocumentData }) {
  const updator = useUpdateDocs();
  const listDocRef = useGetListDocRef(todo.listId, todo.id);
  const docRef = useGetDocRef(todo.id, todo.date);

  const onClickFlag = async (priority: number) => {
    updator(todo.id, 'priority', priority);
    if (docRef && todo.date) await updateDoc(docRef, { priority });
    if (listDocRef && todo.listId) {
      await updateDoc(listDocRef, { priority });
    }
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

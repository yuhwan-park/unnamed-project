// dependencies
import { memo } from 'react';
import { useRecoilValue } from 'recoil';
// components
import ContentForm from 'components/TodoList/ContentForm';
import ListConstructor from './ListConstructor';
// states
import { allDocumentSelector, documentsById, screenStatusState } from 'atoms';
// styles
import * as S from './style';

function TodoList() {
  const allDocuments = useRecoilValue(allDocumentSelector);
  const screenStatus = useRecoilValue(screenStatusState);
  const documents = useRecoilValue(documentsById);

  return (
    <S.Wrapper>
      {screenStatus !== 'All' && <ContentForm />}

      <S.ListContainer>
        <ListConstructor
          documentData={screenStatus === 'All' ? allDocuments : documents}
        />
      </S.ListContainer>
    </S.Wrapper>
  );
}

export default memo(TodoList);

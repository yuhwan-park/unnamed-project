// dependencies
import { useRecoilValue } from 'recoil';
// components
import ContentForm from 'components/TodoList/ContentForm';
import ListConstructor from './ListConstructor';
// states
import { allDocumentSelector, documentsSelector } from 'atoms';
// styles
import { useLocation } from 'react-router-dom';
import * as S from './style';

function TodoList() {
  const location = useLocation();
  const isAllDocumentPage = location.pathname.includes('all');
  const allDocuments = useRecoilValue(allDocumentSelector);
  const documents = useRecoilValue(documentsSelector);

  return (
    <S.Wrapper>
      {!isAllDocumentPage && <ContentForm />}

      <S.ListContainer>
        <ListConstructor
          documentData={isAllDocumentPage ? allDocuments : documents}
        />
      </S.ListContainer>
    </S.Wrapper>
  );
}

export default TodoList;

// dependencies
import { useRecoilValue } from 'recoil';
// components
import ContentForm from 'components/TodoList/ContentForm';
import ListConstructor from './ListConstructor';
// states
import { allDocumentSelector, documentsById, screenStatusState } from 'atoms';
// styles
import * as S from './style';
import { useLocation } from 'react-router-dom';

function TodoList() {
  const location = useLocation();
  const allDocuments = useRecoilValue(allDocumentSelector);
  const screenStatus = useRecoilValue(screenStatusState);
  const documents = useRecoilValue(documentsById);
  const screen = location.pathname.includes('all')
    ? 'All'
    : location.pathname.includes('lists')
    ? 'List'
    : 'Date';

  console.log('screen', screen);

  return (
    <S.Wrapper>
      {screen !== 'All' && <ContentForm />}

      <S.ListContainer>
        <ListConstructor
          documentData={screen === 'All' ? allDocuments : documents}
        />
      </S.ListContainer>
    </S.Wrapper>
  );
}

export default TodoList;

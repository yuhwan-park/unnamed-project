// dependencies
import { memo, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// components
import ContentForm from 'components/TodoList/ContentForm';
import ListConstructor from './ListConstructor';
// states
import {
  allDocumentSelector,
  allDocumentState,
  dateSelector,
  documentsById,
  docIdsState,
  documentCountByDateState,
  loadingState,
  screenStatusState,
  selectedListState,
} from 'atoms';
// firebase
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from 'firebase-source';
// styles
import * as S from './style';

function TodoList() {
  const date = useRecoilValue(dateSelector);
  const selectedList = useRecoilValue(selectedListState);
  const allDocuments = useRecoilValue(allDocumentSelector);
  const screenStatus = useRecoilValue(screenStatusState);
  const setDocIdsByDate = useSetRecoilState(docIdsState);
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

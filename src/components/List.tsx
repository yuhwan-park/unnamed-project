import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { memo, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  allDocumentSelector,
  allDocumentState,
  dateSelector,
  documentCountByDateState,
  documentState,
  loadingState,
  myListDocsState,
  screenStatusState,
  selectedListState,
} from 'atoms';
import { auth, db } from 'firebase-source';
import ContentForm from 'components/list/ContentForm';
import ListConstructor from './ListConstructor';

function List() {
  const date = useRecoilValue(dateSelector);
  const selectedList = useRecoilValue(selectedListState);
  const setAllDocuments = useSetRecoilState(allDocumentState);
  const setDocumentCount = useSetRecoilState(documentCountByDateState);
  const setIsLoading = useSetRecoilState(loadingState);
  const allDocuments = useRecoilValue(allDocumentSelector);
  const screenStatus = useRecoilValue(screenStatusState);
  const [myListDocs, setMyListDocs] = useRecoilState(myListDocsState);
  const [documents, setDocuments] = useRecoilState(documentState);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (!user) return;
      const allDocSnap = await getDoc(doc(db, user.uid, 'All'));

      if (allDocSnap.exists()) {
        setAllDocuments(allDocSnap.data().docMap);
        setDocumentCount(allDocSnap.data().docCount);
      }
      setIsLoading(obj => ({ ...obj, allDoc: true }));
    });
  }, [setAllDocuments, setDocumentCount, setIsLoading]);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (!user) return;
      const docQurey = query(
        collection(db, user.uid, date, 'Document'),
        orderBy('createdAt'),
      );
      const querySnapshot = await getDocs(docQurey);

      const tempArray: any[] = [];
      querySnapshot.forEach(doc => {
        tempArray.push(doc.data());
      });
      setDocuments(tempArray);
      setIsLoading(obj => ({ ...obj, doc: true }));
    });
  }, [date, setDocuments, setIsLoading]);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (!user || !selectedList) return;
      const docQurey = query(
        collection(db, user.uid, 'Lists', selectedList.id),
        orderBy('createdAt'),
      );
      const querySnapshot = await getDocs(docQurey);

      const tempArray: any[] = [];
      querySnapshot.forEach(doc => {
        tempArray.push(doc.data());
      });
      setMyListDocs(tempArray);
    });
  }, [selectedList, setMyListDocs]);
  return (
    <Wrapper>
      {screenStatus !== 'All' && <ContentForm />}

      <ListContainer>
        <ListConstructor
          documentData={
            selectedList
              ? myListDocs
              : screenStatus === 'All'
              ? allDocuments
              : documents
          }
        />
      </ListContainer>
    </Wrapper>
  );
}

export default memo(List);

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    margin-right: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

const ListContainer = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  background-color: rgb(244, 244, 244);
  border-radius: 6px;
`;

import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  allDocumentSelector,
  allDocumentState,
  dateSelector,
  documentCountByDateState,
  documentState,
  myListDocsState,
  selectedListState,
} from 'atoms';
import { auth, db } from 'firebase-source';
import ContentForm from 'components/list/ContentForm';
import ListConstructor from './ListConstructor';
import { useLocation } from 'react-router-dom';

export default function List() {
  const date = useRecoilValue(dateSelector);
  const selectedList = useRecoilValue(selectedListState);
  const setAllDocuments = useSetRecoilState(allDocumentState);
  const setDocumentCount = useSetRecoilState(documentCountByDateState);
  const allDocuments = useRecoilValue(allDocumentSelector);
  const [myListDocs, setMyListDocs] = useRecoilState(myListDocsState);
  const [documents, setDocuments] = useRecoilState(documentState);
  const { pathname } = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (!user) return;
      const allDocSnap = await getDoc(doc(db, user.uid, 'All'));

      if (allDocSnap.exists()) {
        setAllDocuments(allDocSnap.data().docMap);
        setDocumentCount(allDocSnap.data().docCount);
      }
    });
  }, [setAllDocuments, setDocumentCount]);

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
    });
  }, [date, setDocuments]);

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
      {!pathname.includes('all') && <ContentForm />}

      <ListContainer>
        {selectedList ? (
          <ListConstructor documentData={myListDocs} />
        ) : pathname.includes('all') ? (
          <ListConstructor documentData={allDocuments} />
        ) : (
          <ListConstructor documentData={documents} />
        )}
      </ListContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;
`;

const ListContainer = styled.div`
  padding: 10px;
  background-color: rgb(244, 244, 244);
  border-radius: 6px;
  ul {
    border-bottom: 1px solid #bbb;
    &:last-child {
      border: none;
    }
  }
`;

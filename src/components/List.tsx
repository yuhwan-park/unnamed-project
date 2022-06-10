import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  dateSelector,
  documentState,
  myListDocsState,
  selectedListState,
} from 'atoms';
import { auth, db } from 'firebase-source';
import ContentForm from 'components/list/ContentForm';
import ListConstructor from './ListConstructor';

export default function List() {
  const date = useRecoilValue(dateSelector);
  const selectedList = useRecoilValue(selectedListState);
  const [myListDocs, setMyListDocs] = useRecoilState(myListDocsState);
  const [documents, setDocuments] = useRecoilState(documentState);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (!user) return;
      const docQurey = query(
        collection(db, user.uid, date, 'Document'),
        orderBy('createdAt'),
      );
      const querySnapshot = await getDocs(docQurey);

      const tempArray: DocumentData[] = [];
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

      const tempArray: DocumentData[] = [];
      querySnapshot.forEach(doc => {
        tempArray.push(doc.data());
      });
      setMyListDocs(tempArray);
    });
  }, [selectedList, setMyListDocs]);
  return (
    <Wrapper>
      <ContentForm />

      <ListContainer>
        {selectedList ? (
          <ListConstructor documentData={myListDocs} />
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

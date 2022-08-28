// dependencies
import { memo, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// components
import ContentForm from 'components/TodoList/ContentForm';
import ListConstructor from './ListConstructor';
// states
import {
  allDocumentSelector,
  allDocumentState,
  dateSelector,
  docByDate,
  docIdsByDate,
  documentCountByDateState,
  documentState,
  loadingState,
  myListDocsState,
  screenStatusState,
  selectedListState,
} from 'atoms';
// firebase
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { auth, db } from 'firebase-source';
// styles
import * as S from './style';

function TodoList() {
  const date = useRecoilValue(dateSelector);
  const selectedList = useRecoilValue(selectedListState);
  const setAllDocuments = useSetRecoilState(allDocumentState);
  const setDocumentCount = useSetRecoilState(documentCountByDateState);
  const setIsLoading = useSetRecoilState(loadingState);
  const allDocuments = useRecoilValue(allDocumentSelector);
  const screenStatus = useRecoilValue(screenStatusState);
  const [myListDocs, setMyListDocs] = useRecoilState(myListDocsState);
  const [documents, setDocuments] = useRecoilState(documentState);
  const setDocIdsByDate = useSetRecoilState(docIdsByDate);
  const docs = useRecoilValue(docByDate);

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
      // const docQurey = query(
      //   collection(db, user.uid, date, 'Document'),
      //   orderBy('createdAt'),
      // );
      // const querySnapshot = await getDocs(docQurey);

      // const tempArray: any[] = [];
      // querySnapshot.forEach(doc => {
      //   tempArray.push(doc.data());
      // });
      // setDocuments(tempArray);
      const docSnap = await getDoc(doc(db, user.uid, 'Date'));
      if (docSnap.exists() && docSnap.data()[date]) {
        setDocIdsByDate(docSnap.data()[date] as string[]);
      } else {
        setDocIdsByDate([]);
      }
      setIsLoading(obj => ({ ...obj, doc: true }));
    });
  }, [date, setDocIdsByDate, setIsLoading]);

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
    <S.Wrapper>
      {screenStatus !== 'All' && <ContentForm />}

      <S.ListContainer>
        <ListConstructor
          documentData={
            selectedList
              ? myListDocs
              : screenStatus === 'All'
              ? allDocuments
              : docs
          }
        />
      </S.ListContainer>
    </S.Wrapper>
  );
}

export default memo(TodoList);

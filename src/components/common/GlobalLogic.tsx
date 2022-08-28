// dependencis
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// states
import {
  allDocumentState,
  dateSelector,
  docIdsByDateState,
  docIdsState,
  documentCountByDateState,
  loadingState,
  myListsState,
  paramState,
  selectedListState,
} from 'atoms';
// firebase
import { auth, db } from 'firebase-source';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function GlobalLogic() {
  const params = useParams();
  const navigate = useNavigate();
  const date = useRecoilValue(dateSelector);
  const selectedList = useRecoilValue(selectedListState);
  const [myLists, setMyLists] = useRecoilState(myListsState);
  const [docIdsByDate, setDocIdsByDate] = useRecoilState(docIdsByDateState);
  const setParams = useSetRecoilState(paramState);
  const setAllDocuments = useSetRecoilState(allDocumentState);
  const setDocumentCount = useSetRecoilState(documentCountByDateState);
  const setIsLoading = useSetRecoilState(loadingState);
  const setDocIds = useSetRecoilState(docIdsState);

  useEffect(() => {
    // 로그인이 되어있지 않다면 홈으로 리다이렉트
    onAuthStateChanged(auth, user => {
      if (!user) {
        navigate('/');
      }
    });
  }, [navigate]);

  useEffect(() => {
    // URL 파라미터가 바뀔 때마다 URL 파라미터를 상태에 저장
    setParams(params);
  }, [params, setParams]);

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (!user) return;
      const allDocSnap = await getDoc(doc(db, user.uid, 'All'));
      const listDocSnap = await getDoc(doc(db, user.uid, 'Lists'));
      const dateDocSnap = await getDoc(doc(db, user.uid, 'Date'));

      if (allDocSnap.exists()) {
        setAllDocuments(allDocSnap.data().docMap);
        setDocumentCount(allDocSnap.data().docCount);
      }

      if (listDocSnap.exists()) {
        setMyLists(listDocSnap.data());
      }

      if (dateDocSnap.exists()) {
        setDocIdsByDate(dateDocSnap.data());
      }
      setIsLoading(true);
    });
  }, [
    setAllDocuments,
    setDocIdsByDate,
    setDocumentCount,
    setIsLoading,
    setMyLists,
  ]);

  useEffect(() => {
    if (selectedList) {
      setDocIds(myLists[selectedList.id].docIds);
    } else if (docIdsByDate[date]) {
      setDocIds(docIdsByDate[date]);
    } else {
      setDocIds([]);
    }
  }, [date, docIdsByDate, myLists, selectedList, setDocIds]);

  return null;
}

export default GlobalLogic;

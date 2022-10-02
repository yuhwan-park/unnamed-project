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
  myListsState,
  paramState,
  selectedListState,
  userInfoState,
} from 'atoms';
// firebase
import { auth, db } from 'firebase-source';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { isInitializedState } from 'atoms/isInitializedState';

function GlobalLogic() {
  const params = useParams();
  const navigate = useNavigate();
  const [docIdsByDate, setDocIdsByDate] = useRecoilState(docIdsByDateState);
  const [user, setUser] = useRecoilState(userInfoState);
  const [myLists, setMyLists] = useRecoilState(myListsState);
  const date = useRecoilValue(dateSelector);
  const selectedList = useRecoilValue(selectedListState);
  const setIsInitialized = useSetRecoilState(isInitializedState);
  const setParams = useSetRecoilState(paramState);
  const setDocIds = useSetRecoilState(docIdsState);
  const setAllDocument = useSetRecoilState(allDocumentState);

  useEffect(() => {
    // 로그인이 되어있지 않다면 홈으로 리다이렉트
    onAuthStateChanged(auth, user => {
      if (!user) {
        navigate('/');
      } else {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
      }
    });
  }, [navigate, setUser]);

  useEffect(() => {
    if (user.uid) {
      const unsubAllDocument = onSnapshot(doc(db, user.uid, 'All'), doc => {
        if (doc.exists()) {
          setAllDocument(doc.data());
          setIsInitialized(prev => ({ ...prev, all: true }));
        }
      });
      const unsubDocIdsByDate = onSnapshot(doc(db, user.uid, 'Date'), doc => {
        if (doc.exists()) {
          setDocIdsByDate(doc.data());
          setIsInitialized(prev => ({ ...prev, date: true }));
        }
      });
      const unsubLists = onSnapshot(doc(db, user.uid, 'Lists'), doc => {
        if (doc.exists()) {
          setMyLists(doc.data());
          setIsInitialized(prev => ({ ...prev, lists: true }));
        }
      });
      return () => {
        unsubAllDocument();
        unsubDocIdsByDate();
        unsubLists();
      };
    }
  }, [setAllDocument, setDocIdsByDate, setIsInitialized, setMyLists, user.uid]);

  useEffect(() => {
    // URL 파라미터가 바뀔 때마다 URL 파라미터를 상태에 저장
    setParams(params);
  }, [params, setParams]);

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

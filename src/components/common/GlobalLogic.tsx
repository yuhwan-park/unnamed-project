// dependencis
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// states
import {
  dateSelector,
  docIdsByDateState,
  docIdsState,
  myListsState,
  paramState,
  selectedListState,
} from 'atoms';
// firebase
import { auth } from 'firebase-source';
import { onAuthStateChanged } from 'firebase/auth';

function GlobalLogic() {
  const params = useParams();
  const navigate = useNavigate();
  const date = useRecoilValue(dateSelector);
  const selectedList = useRecoilValue(selectedListState);
  const myLists = useRecoilValue(myListsState);
  const docIdsByDate = useRecoilValue(docIdsByDateState);
  const setParams = useSetRecoilState(paramState);
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

// dependencis
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
// states
import { paramState } from 'atoms';
// firebase
import { auth } from 'firebase-source';
import { onAuthStateChanged } from 'firebase/auth';

function GlobalLogic() {
  const params = useParams();
  const navigate = useNavigate();
  const setParams = useSetRecoilState(paramState);

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

  return null;
}

export default GlobalLogic;

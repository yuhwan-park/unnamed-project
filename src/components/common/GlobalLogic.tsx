import { paramState } from 'atoms';
import { auth } from 'firebase-source';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

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

  useEffect(() => {
    // 소셜 로그인 중인지 판단을 위한 플래그를 제거
    sessionStorage.clear();
  }, []);
  return null;
}

export default GlobalLogic;

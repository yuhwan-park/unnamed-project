import { paramState, userState } from 'atoms';
import { auth } from 'firebase-source';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

function GlobalLogic() {
  const params = useParams();
  const navigate = useNavigate();
  const setUserData = useSetRecoilState(userState);
  const setParams = useSetRecoilState(paramState);

  useEffect(() => {
    // 로그인이 되어있지 않다면 홈으로 리다이렉트
    // 되어있다면 유저정보 상태를 저장
    onAuthStateChanged(auth, user => {
      if (!user) {
        navigate('/');
      } else {
        const { displayName, email, uid, photoURL } = user;
        setUserData({ displayName, email, uid, photoURL });
      }
    });
  }, [navigate, setUserData]);

  useEffect(() => {
    // URL 파라미터가 바뀔 때마다 URL 파라미터를 상태에 저장
    setParams(params);
  }, [params, setParams]);

  return null;
}

export default GlobalLogic;

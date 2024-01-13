import { userInfoState } from 'atoms';
import { auth } from 'firebase-source';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const AuthRoute = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userInfoState);

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

  return <Outlet />;
};

export default AuthRoute;

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from 'firebase-source';

function Home() {
  const navigator = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        navigator('/main');
      }
    });
  }, [navigator]);
  return (
    <>
      <Link to={'/signin'}>
        <button>로그인</button>
      </Link>
      <Link to={'/signup'}>
        <button>Sign Up</button>
      </Link>
      <main>some article...</main>
    </>
  );
}

export default Home;

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Nav from '../components/Nav';

function Main() {
  const navigator = useNavigate();
  const onClickSignOut = async () => {
    await signOut(auth);
  };
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) {
        navigator('/');
      }
    });
  }, [navigator]);
  return (
    <>
      <Nav />
      <button onClick={onClickSignOut}>signOut</button>
    </>
  );
}

export default Main;

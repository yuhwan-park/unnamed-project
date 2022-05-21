import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Nav from '../components/Nav';
import ListForm from '../components/ListForm';

function Main() {
  const navigator = useNavigate();

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
      <ListForm />
    </>
  );
}

export default Main;

import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Nav from '../components/Nav';
import ListForm from '../components/ListForm';

function Main() {
  const [user, setUser] = useState<User>();
  const navigator = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) {
        navigator('/');
      } else {
        setUser(user);
      }
    });
  }, [navigator]);
  return (
    <>
      {user ? (
        <>
          <Nav />
          <ListForm />
        </>
      ) : null}
    </>
  );
}

export default Main;

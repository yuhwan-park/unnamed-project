import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Nav from '../components/Nav';
import List from '../components/List';

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
          <List />
        </>
      ) : null}
    </>
  );
}

export default Main;

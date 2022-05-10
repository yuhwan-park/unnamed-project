import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function SignIn() {
  const navigator = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        navigator('/main');
      }
    });
  }, [navigator]);
  return <div>SignIn Form...</div>;
}

export default SignIn;

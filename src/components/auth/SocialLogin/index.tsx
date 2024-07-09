// firebase
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'firebase-source';
// styles
import * as S from './style';
import GoogleLogo from 'assets/GoogleLogo.svg';

function SocialLogin() {
  const provider = new GoogleAuthProvider();

  const onClickSignInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
    <S.GoogleLogin onClick={onClickSignInWithGoogle}>
      <img src={GoogleLogo} width="20px" alt="Google" />
      Google
    </S.GoogleLogin>
  );
}

export default SocialLogin;

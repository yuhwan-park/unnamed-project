import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import styled from 'styled-components';
import { auth } from 'firebase-source';
import GoogleLogo from 'assets/GoogleLogo.svg';
function SocialLogin() {
  const provider = new GoogleAuthProvider();

  const onClickSignInWithGoogle = async () => {
    await signInWithRedirect(auth, provider);
  };

  return (
    <GoogleLogin onClick={onClickSignInWithGoogle}>
      <img src={GoogleLogo} width="20px" alt="Google" />
      Google
    </GoogleLogin>
  );
}

export default SocialLogin;

const GoogleLogin = styled.button`
  position: relative;
  width: 100%;
  height: 40px;
  margin: 0 auto;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  img {
    position: absolute;
    left: 10px;
    top: 10px;
  }
`;

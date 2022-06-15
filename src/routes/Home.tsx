import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from 'firebase-source';
import styled from 'styled-components';

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
    <Wrapper>
      <Nav>
        <Logo className="logo" draggable>
          dail
        </Logo>
        <SignLink>
          <Link to={'/signin'}>
            <div>로그인</div>
          </Link>
          <Link to={'/signup'}>
            <div>회원가입</div>
          </Link>
        </SignLink>
      </Nav>
      <Container></Container>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  width: 80vw;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  padding: 10px 0;
  margin: 0 auto;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 6%);
`;

const Logo = styled.div`
  font-size: 48px;
  width: 40%;
  padding-left: 30px;
`;

const SignLink = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
  a {
    color: black;
    padding: 0 20px;
    font-size: 16px;
  }
`;

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from 'firebase-source';
import styled from 'styled-components';
import { devices } from 'style/media-queries';
import { motion } from 'framer-motion';

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
          <Link to={'/signin'}>로그인</Link>
          <Link to={'/signup'}>회원가입</Link>
        </SignLink>
      </Nav>
      <Container>
        <Word>
          <p>
            Daily하게 <span>dail</span> !
          </p>
          <p>지금 바로 기록해보세요!</p>
        </Word>

        <Link to={'/signup'}>
          <StartButton
            initial={{
              color: 'rgb(16, 130, 253)',
            }}
            whileHover={{
              backgroundColor: 'rgb(16, 130, 253)',
              color: 'rgb(255,255,255)',
            }}
          >
            시작하기
          </StartButton>
        </Link>
      </Container>
      <ShapeDivider>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="shape-fill"
          ></path>
        </svg>
      </ShapeDivider>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const StartButton = styled(motion.div)`
  font-weight: 700;
  cursor: pointer;
  border: 2px solid rgb(16, 130, 253);
  border-radius: 5px;
  background-color: white;
  padding: 20px 50px;
`;

const Word = styled.div`
  width: 80%;
  text-align: center;

  font-size: 48px;
  font-weight: 700;
  text-shadow: rgb(0 0 0 / 10%) 2px 2px 4px;
  padding: 20px 0;
  p {
    padding: 10px 0;
  }
  @media (min-width: 470px) and (max-width: 624px) {
    font-size: 36px;
  }
  @media (max-width: 470px) {
    font-size: 24px;
  }

  span {
    color: #1082fd;
  }
`;

const Logo = styled.div`
  font-size: 48px;
  width: 40%;
  padding-left: 30px;
  @media ${devices.mobileL} {
    width: 50%;
    padding-left: 20px;
  }
`;

const ShapeDivider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: -1;
  transform: rotate(180deg);
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 40vh;
    transform: rotateY(180deg);
  }
  .shape-fill {
    fill: #1082fd;
  }
`;

const SignLink = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
  word-break: keep-all;
  a {
    color: black;
    padding: 0 20px;
    font-size: 16px;
    &:hover {
      font-weight: 700;
    }
  }
  @media (max-width: 480px) {
    width: 50%;
    a {
      font-size: 14px;
      padding: 0 10px;
    }
  }
`;

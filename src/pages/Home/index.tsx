// dependencies
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase-source';

// styles
import * as S from './style';

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
    <S.Wrapper>
      <S.Nav>
        <S.Logo>dail-t2</S.Logo>
        <S.Links>
          <Link to={'/signin'}>로그인</Link>
          <Link to={'/signup'}>회원가입</Link>
        </S.Links>
      </S.Nav>

      <S.Container>
        <S.Paragraph>
          <p>
            Daily하게 <span>dail</span> !
          </p>
          <p>지금 바로 기록해보세요!</p>
        </S.Paragraph>

        <Link to={'/signup'}>
          <S.StartButton
            initial={{
              color: 'rgb(16, 130, 253)',
            }}
            whileHover={{
              backgroundColor: 'rgb(16, 130, 253)',
              color: 'rgb(255,255,255)',
            }}
          >
            시작하기
          </S.StartButton>
        </Link>
      </S.Container>

      <S.ShapeDivider>
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
      </S.ShapeDivider>
    </S.Wrapper>
  );
}

export default Home;

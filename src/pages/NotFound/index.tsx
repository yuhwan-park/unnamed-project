// dependencies
import { Link } from 'react-router-dom';

// styles
import { Logo } from 'style/sign-page';
import * as S from './style';

function NotFound() {
  return (
    <S.Wrapper>
      <Logo>dail</Logo>

      <S.MessageContainer>
        <h2>404 Page Not Found</h2>
        <p>페이지를 찾을 수 없습니다.</p>
        <p>불편을 드려 죄송합니다.</p>
      </S.MessageContainer>

      <Link to={'/'}>
        <S.Button>홈으로</S.Button>
      </Link>
    </S.Wrapper>
  );
}

export default NotFound;

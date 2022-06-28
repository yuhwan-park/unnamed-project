// dependencies
import { Link } from 'react-router-dom';

// styles
import { Logo } from 'style/sign-page';
import styled from 'styled-components';

function NotFound() {
  return (
    <Wrapper>
      <Logo>dail</Logo>

      <MessageContainer>
        <h2>404 Page Not Found</h2>
        <p>페이지를 찾을 수 없습니다.</p>
        <p>불편을 드려 죄송합니다.</p>
      </MessageContainer>

      <Link to={'/'}>
        <Button>홈으로</Button>
      </Link>
    </Wrapper>
  );
}

export default NotFound;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const MessageContainer = styled.div`
  text-align: center;
  h2 {
    font-size: 24px;
  }
  p {
    padding: 5px 0;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: rgba(16, 130, 253, 0.7);
  color: white;
  width: 100px;
  height: 50px;
  &:hover {
    background-color: rgba(16, 130, 253, 0.9);
  }
`;

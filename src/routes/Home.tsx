import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Link to={'/signin'}>
        <button>로그인</button>
      </Link>
      <Link to={'/signup'}>
        <button>Sign Up</button>
      </Link>
      <main>some article...</main>
    </>
  );
}

export default Home;

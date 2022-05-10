import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Main from './routes/Main';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 로그인 없이 main 강제접속 시 Home으로 redirect */}
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'routes/Home';
import Main from 'routes/Main';
import RequestUpdatePassword from 'routes/RequestUpdatePassword';
import SignIn from 'routes/SignIn';
import SignUp from 'routes/SignUp';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 로그인 없이 main 강제접속 시 Home으로 redirect */}
        <Route path="/main" element={<Main />}>
          <Route path="/main/:id" element={<Main />} />
          <Route path="/main/Lists/:listId/tasks" element={<Main />} />
          <Route path="/main/Lists/:listId/tasks/:id" element={<Main />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/requestUpdatePassword"
          element={<RequestUpdatePassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

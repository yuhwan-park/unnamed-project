import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import RequestUpdatePassword from 'pages/RequestUpdatePassword';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import { Route, Routes } from 'react-router-dom';
import MainRoute from './MainRoute';
import Main from 'pages/Main';
import AuthRoute from './AuthRoute';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AuthRoute />}>
        <Route path="main" element={<MainRoute />}>
          <Route index element={<Main />} />
          <Route path=":id" element={<Main />} />
          <Route path="lists/:listId/tasks" element={<Main />} />
          <Route path="lists/:listId/tasks/:id" element={<Main />} />
          <Route path="all/tasks" element={<Main />} />
          <Route path="all/tasks/:id" element={<Main />} />
        </Route>
      </Route>
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="requestUpdatePassword" element={<RequestUpdatePassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'routes/Home';
import Main from 'routes/Main';
import NotFound from 'routes/NotFound';
import RequestUpdatePassword from 'routes/RequestUpdatePassword';
import SignIn from 'routes/SignIn';
import SignUp from 'routes/SignUp';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="main" element={<Main />}>
          <Route path=":id" element={<Main />} />
          <Route path="lists/:listId/tasks" element={<Main />} />
          <Route path="lists/:listId/tasks/:id" element={<Main />} />
          <Route path="all/tasks" element={<Main />} />
          <Route path="all/tasks/:id" element={<Main />} />
        </Route>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route
          path="requestUpdatePassword"
          element={<RequestUpdatePassword />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

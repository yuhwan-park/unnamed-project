import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Nav from '../components/Nav';
import List from '../components/List';
import Editor from '../components/Editor';
import styled from 'styled-components';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';

function Main() {
  const [user, setUser] = useState<User>();
  const [width, setWidth] = useState(window.innerWidth);
  const navigator = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (!user) {
        navigator('/');
      } else {
        setUser(user);
      }
    });
  }, [navigator]);
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  return (
    <>
      {user ? (
        <>
          <Nav />

          {width > 1024 ? (
            <Container>
              <ReflexContainer orientation="vertical">
                <ReflexElement className="left-pane" minSize={300}>
                  <List />
                </ReflexElement>
                <ReflexSplitter />
                <ReflexElement className="right-pane" minSize={300}>
                  <Editor />
                </ReflexElement>
              </ReflexContainer>
            </Container>
          ) : (
            <ResponsiveContainer>
              <List />
              <Editor />
            </ResponsiveContainer>
          )}
        </>
      ) : null}
    </>
  );
}

export default Main;

const Container = styled.div`
  height: 95vh;
`;

const ResponsiveContainer = styled.div`
  display: flex;
`;

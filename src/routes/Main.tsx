import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Nav from '../components/Nav';
import List from '../components/List';
import Editor from '../components/Editor';
import styled from 'styled-components';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';

function Main() {
  const [user, setUser] = useState<User>();
  const [detail, setDetail] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const navigator = useNavigate();

  const onClickScreen = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (width > 1024) return;
    if (target.closest('.check-box')) return;
    setDetail(Boolean(target.closest('.detail-trigger')));
  };

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

  useEffect(() => {
    const closeDetail = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) setDetail(false);
    };
    if (detail) window.addEventListener('keydown', closeDetail);
    return () => window.removeEventListener('keydown', closeDetail);
  }, [detail]);

  return (
    <div onClick={onClickScreen}>
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
                  <Editor detail={detail} />
                </ReflexElement>
              </ReflexContainer>
            </Container>
          ) : (
            <ResponsiveContainer>
              <List />
              <Editor detail={detail} />
            </ResponsiveContainer>
          )}
        </>
      ) : null}
    </div>
  );
}

export default Main;

const Container = styled.div`
  height: 95vh;
`;

const ResponsiveContainer = styled.div`
  display: flex;
  height: 95vh;
`;

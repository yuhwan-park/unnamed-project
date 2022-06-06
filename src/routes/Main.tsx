import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Nav from '../components/Nav';
import List from '../components/List';
import styled from 'styled-components';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import ContentEditor from '../components/ContentEditor';
import MainMenu from '../components/MainMenu';

function Main() {
  const [user, setUser] = useState<User>();
  const [showEditor, setShowEditor] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const navigator = useNavigate();

  const onClickScreen = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (width > 1024) return;
    if (target.closest('.check-box')) return;
    setShowEditor(Boolean(target.closest('.show-editor-trigger')));
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
      if (e.key === 'Escape' || e.keyCode === 27) setShowEditor(false);
    };
    if (showEditor) window.addEventListener('keydown', closeDetail);
    return () => window.removeEventListener('keydown', closeDetail);
  }, [showEditor]);

  return (
    <>
      <Nav />

      <Wrapper onClick={onClickScreen}>
        {user ? (
          <>
            {width > 1024 ? (
              <ResponsiveContainer>
                <MainMenu />
                <ReflexContainer orientation="vertical">
                  <ReflexElement className="left-pane">
                    <List />
                  </ReflexElement>
                  <ReflexSplitter style={{ border: 'none' }} />
                  <ReflexElement
                    className="right-pane"
                    minSize={400}
                    maxSize={1000}
                  >
                    <ContentEditor showEditor={showEditor} />
                  </ReflexElement>
                </ReflexContainer>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer>
                <List />
                <ContentEditor showEditor={showEditor} />
              </ResponsiveContainer>
            )}
          </>
        ) : null}
      </Wrapper>
    </>
  );
}

export default Main;

const Wrapper = styled.div`
  height: calc(100vh - 50px);
`;

const ResponsiveContainer = styled.div`
  display: flex;
  height: 100%;
`;

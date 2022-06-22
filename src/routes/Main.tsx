import React, { useEffect } from 'react';
import Nav from 'components/common/Nav';
import List from 'components/List';
import styled from 'styled-components';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import ContentEditor from 'components/ContentEditor';
import { AnimatePresence, motion } from 'framer-motion';
import OffCanvasMenu from 'components/OffCanvasMenu';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isWideState, loadingSelector, showEditorState } from 'atoms';
import { editorVariants } from 'variants';
import Loading from 'components/common/Loading';
import { useDetectClickOutside } from 'hooks';
import GlobalLogic from 'components/common/GlobalLogic';

function Main() {
  const [showEditor, setShowEditor] = useRecoilState(showEditorState);
  const [isWide, setIsWide] = useRecoilState(isWideState);
  const isLoading = useRecoilValue(loadingSelector);
  useDetectClickOutside({ onTriggered: () => setShowEditor(false) });

  const onClickScreen = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (isWide) return;
    if (target.closest('.check-box') || target.closest('.go-back-icon')) return;
    setShowEditor(Boolean(target.closest('.show-editor-trigger')));
  };

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth > 1024) {
        setIsWide(true);
      } else {
        setIsWide(false);
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [setIsWide]);

  return (
    <>
      {isLoading && <Loading />}
      <Wrapper onClick={onClickScreen}>
        {true && (
          <>
            <Nav />
            {isWide ? (
              <ResponsiveContainer>
                <OffCanvasMenu />
                <ReflexContainer orientation="vertical">
                  <ReflexElement className="left-pane">
                    <List />
                  </ReflexElement>
                  <ReflexSplitter style={{ border: 'none' }} />
                  <ReflexElement
                    className="right-pane"
                    minSize={400}
                    maxSize={window.innerWidth / 2 + 100}
                  >
                    <ContentEditor />
                  </ReflexElement>
                </ReflexContainer>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer>
                <OffCanvasMenu />
                <List />
                <AnimatePresence initial={false}>
                  {showEditor && (
                    <EditorContainer
                      variants={editorVariants}
                      animate="visible"
                      initial="initial"
                      exit="exit"
                      transition={{ type: 'tween' }}
                    >
                      <ContentEditor />
                    </EditorContainer>
                  )}
                </AnimatePresence>
              </ResponsiveContainer>
            )}
          </>
        )}
      </Wrapper>
      <GlobalLogic />
    </>
  );
}

export default Main;

const Wrapper = styled.div`
  height: 100vh;
`;

const ResponsiveContainer = styled.div`
  display: flex;
  height: calc(100vh - 50px);
`;

const EditorContainer = styled(motion.div)`
  z-index: 30;
  width: 70%;
  position: absolute;
  height: calc(100vh - 50px);
  box-shadow: 0 6px 20px rgb(0 0 0 / 15%);
`;

// dependencies
import React, { useEffect } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { AnimatePresence } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
// components
import Header from 'components/common/Header';
import TodoList from 'components/TodoList';
import ContentEditor from 'components/ContentEditor';
import OffCanvasMenu from 'components/OffCanvasMenu';
import Loading from 'components/common/Loading';
import GlobalLogic from 'components/common/GlobalLogic';
// states
import { isLoadingState, isWideState, showEditorState } from 'atoms';
// sources
import { editorVariants } from 'variants';
import { useDetectClickOutside } from 'hooks';
// styles
import * as S from './style';

function Main() {
  const [showEditor, setShowEditor] = useRecoilState(showEditorState);
  const [isWide, setIsWide] = useRecoilState(isWideState);
  const isLoading = useRecoilValue(isLoadingState);
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
      <GlobalLogic />
      <S.Wrapper onClick={onClickScreen}>
        <Header />
        {isWide ? (
          <S.ResponsiveContainer>
            <OffCanvasMenu />
            <ReflexContainer orientation="vertical">
              <ReflexElement className="left-pane">
                <TodoList />
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
          </S.ResponsiveContainer>
        ) : (
          <S.ResponsiveContainer>
            <OffCanvasMenu />
            <TodoList />
            <AnimatePresence initial={false}>
              {showEditor && (
                <S.EditorContainer
                  variants={editorVariants}
                  animate="visible"
                  initial="initial"
                  exit="exit"
                  transition={{ type: 'tween' }}
                >
                  <ContentEditor />
                </S.EditorContainer>
              )}
            </AnimatePresence>
          </S.ResponsiveContainer>
        )}
      </S.Wrapper>
    </>
  );
}

export default Main;

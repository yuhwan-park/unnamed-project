// dependencies
import { AnimatePresence, motion } from 'framer-motion';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { useRecoilValue } from 'recoil';
// components
import ContentEditor from 'components/ContentEditor';
import TodoList from 'components/TodoList';
// states
import { isWideState, showEditorState } from 'atoms';
// sources
import { editorVariants } from 'variants';
// styles
import styled from 'styled-components';

function Main() {
  const showEditor = useRecoilValue(showEditorState);
  const isWide = useRecoilValue(isWideState);

  return (
    <>
      {isWide ? (
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
      ) : (
        <>
          <TodoList />
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
        </>
      )}
    </>
  );
}

export default Main;

const EditorContainer = styled(motion.section)`
  z-index: 30;
  width: 70%;
  position: absolute;
  height: calc(100vh - 50px);
  box-shadow: 0 6px 20px rgb(0 0 0 / 15%);
`;

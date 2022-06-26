import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import { createRef, memo, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { paramState, selectedDocumentState } from 'atoms';
import { useUpdateDocs } from 'hooks';
import { useMemo } from 'react';
import EditorHeader from './ContentEditor/EditorHeader';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

function ContentEditor() {
  const params = useRecoilValue(paramState);
  const document = useRecoilValue(selectedDocumentState);
  const flag = useRef(false);
  const updator = useUpdateDocs();
  const editorRef = useMemo(() => createRef<Editor>(), []);
  let timer: NodeJS.Timeout;

  const onKeyUpEditor = () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      if (!document) return;
      await updator(document, 'content', content, true);
    }, 1000);
  };

  const onBlurEditor = () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    setTimeout(async () => {
      if (!document) return;
      await updator(document, 'content', content, true);
    }, 100);
  };

  useEffect(() => {
    flag.current = true;
  }, [params]);

  useEffect(() => {
    if (!document || !flag.current) return;
    // 페이지 로드 & ID 파라미터가 바뀔때만 실행되게 분기처리
    editorRef.current?.getInstance().setMarkdown(document.content, false);
    flag.current = false;
  }, [document, editorRef]);

  return (
    <Wrapper className="show-editor-trigger">
      {params['id'] && document && (
        <>
          <EditorHeader />
          <Editor
            height="calc(100% - 100px)"
            initialEditType="wysiwyg"
            autofocus={false}
            language="ko-KR"
            hideModeSwitch={true}
            toolbarItems={[
              ['heading', 'bold', 'italic', 'strike'],
              ['hr', 'quote'],
              ['ul', 'ol', 'task'],
              ['image', 'link'],
            ]}
            placeholder="설명"
            ref={editorRef}
            onKeyup={onKeyUpEditor}
            onBlur={onBlurEditor}
          />
        </>
      )}
    </Wrapper>
  );
}

export default memo(ContentEditor);

const Wrapper = styled.div`
  background-color: white;
  height: 100%;
`;

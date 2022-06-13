import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { paramState, selectedDocumentState } from 'atoms';
import { useUpdateDocs } from 'hooks';
import { useMemo } from 'react';
import EditorHeader from './ContentEditor/EditorHeader';

function ContentEditor() {
  const params = useRecoilValue(paramState);
  const document = useRecoilValue(selectedDocumentState);
  let timer: NodeJS.Timeout;
  const flag = useRef(false);
  const updator = useUpdateDocs();
  const editorRef = useMemo(() => React.createRef<Editor>(), []);

  const onKeyUpEditor = () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      if (!document) return;
      updator(document, 'content', content, true);
    }, 1000);
  };

  const onBlurEditor = () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    setTimeout(async () => {
      if (!document) return;
      updator(document, 'content', content, true);
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
      {params['id'] ? (
        <EditorContainer>
          <EditorHeader />
          <Editor
            height="100%"
            initialEditType="wysiwyg"
            autofocus={false}
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
        </EditorContainer>
      ) : null}
    </Wrapper>
  );
}

export default React.memo(ContentEditor);

const Wrapper = styled.div`
  background-color: white;
  height: 100%;
`;

const EditorContainer = styled.div`
  height: calc(100% - 80px);
`;

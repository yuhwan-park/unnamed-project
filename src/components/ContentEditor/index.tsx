// dependencies
import { Editor } from '@toast-ui/react-editor';
import { memo, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
// components
import EditorHeader from './EditorHeader';
// states
import { paramState, selectedDocumentState } from 'atoms';
// hooks
import { useUpdateTodo } from 'hooks';
// styles
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import * as S from './style';

function ContentEditor() {
  const params = useRecoilValue(paramState);
  const document = useRecoilValue(selectedDocumentState);
  const flag = useRef(false);
  const updator = useUpdateTodo();
  const editorRef = useRef<Editor>(null);
  let timer: NodeJS.Timeout;

  const onKeyUpEditor = () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      if (!document) return;
      await updator(document, 'content', content as string);
    }, 1000);
  };

  const onBlurEditor = () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    setTimeout(async () => {
      if (!document) return;
      await updator(document, 'content', content as string);
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
    <S.Wrapper className="show-editor-trigger">
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
    </S.Wrapper>
  );
}

export default memo(ContentEditor);

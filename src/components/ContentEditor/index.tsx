import { Editor } from '@toast-ui/react-editor';
import { memo, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import EditorHeader from './EditorHeader';
import { selectedDocumentState } from 'atoms';
import { useUpdateTodo } from 'hooks';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useParams } from 'react-router-dom';
import * as S from './style';

function ContentEditor() {
  const params = useParams();
  const document = useRecoilValue(selectedDocumentState);
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
    if (!document) return;
    editorRef.current?.getInstance().setMarkdown(document.content, false);
  }, [document]);

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

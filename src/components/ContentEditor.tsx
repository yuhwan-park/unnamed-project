import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { documentState, paramState, selectedDocumentState } from '../atoms';
import { setDoc } from 'firebase/firestore';
import { useGetDocRef } from '../hooks';
import { useMemo } from 'react';

export default function ContentEditor() {
  const [flag, setFlag] = useState(true);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const params = useParams();
  const editorRef = useMemo(() => React.createRef<Editor>(), []);
  const docRef = useGetDocRef(params['id']);
  const setParams = useSetRecoilState(paramState);
  const setDocuments = useSetRecoilState(documentState);
  const document = useRecoilValue(selectedDocumentState);

  const onKeyUpEditor = () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      setDocuments(document =>
        document.map(value =>
          value.id === params['id'] ? { ...value, content } : value,
        ),
      );
      if (docRef) await setDoc(docRef, { content }, { merge: true });
    }, 1000);
    setTimer(newTimer);
  };

  const onBlurEditor = () => {
    const content = editorRef.current?.getInstance().getMarkdown();
    setTimeout(async () => {
      setDocuments(document =>
        document.map(value =>
          value.id === params['id'] ? { ...value, content } : value,
        ),
      );
      if (docRef) await setDoc(docRef, { content }, { merge: true });
    }, 100);
  };

  useEffect(() => {
    if (params['id']) {
      setFlag(true);
      setParams(params['id']);
    }
  }, [params, setParams]);

  useEffect(() => {
    if (flag && document) {
      // 페이지 로드 & ID 파라미터가 바뀔때만 실행되게 분기처리
      editorRef.current?.getInstance().setMarkdown(document?.content, false);
      setFlag(false);
    }
  }, [document, editorRef, flag]);

  return (
    <Container className="show-editor-trigger">
      {params['id'] ? (
        <>
          <HeaderContainer>
            <EditorTitle>{document?.title}</EditorTitle>
          </HeaderContainer>
          <EditorContainer>
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
        </>
      ) : null}
    </Container>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;
const EditorContainer = styled.div`
  height: calc(100% - 50px);
`;

const EditorTitle = styled.div`
  width: 100%;
  padding: 5px 10px;
  font-weight: 700;
`;

const Container = styled.div`
  background-color: white;
  height: 100%;
`;

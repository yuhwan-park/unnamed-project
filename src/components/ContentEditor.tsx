import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { documentState, paramState, selectedDocumentState } from '../atoms';
import { setDoc } from 'firebase/firestore';
import { useGetDocRef } from '../hooks';
import { useMemo } from 'react';

interface IEditorProps {
  showEditor: boolean;
}

export default function ContentEditor({ showEditor }: IEditorProps) {
  const [flag, setFlag] = useState(true);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const params = useParams();
  const editorRef = useMemo(() => React.createRef<Editor>(), []);
  const docRef = useGetDocRef(params['id']);
  const setParams = useSetRecoilState(paramState);
  const setDocuments = useSetRecoilState(documentState);
  const document = useRecoilValue(selectedDocumentState);

  const onKeyDownEditor = () => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      const content = editorRef.current?.getInstance().getMarkdown();
      setDocuments(document =>
        document.map(value =>
          value.id === params['id'] ? { ...value, content } : value,
        ),
      );
      if (docRef) await setDoc(docRef, { content }, { merge: true });
    }, 1000);
    setTimer(newTimer);
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
    <Container className="show-editor-trigger" showEditor={showEditor}>
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
              onKeyup={onKeyDownEditor}
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

const Container = styled.div<IEditorProps>`
  background-color: white;
  height: 100%;
  @media (max-width: 1024px) {
    z-index: 4;
    width: 70%;
    position: absolute;
    height: calc(100% - 50px);
    right: 0;
    display: ${props => (props.showEditor ? 'block' : 'none')};
    box-shadow: 0 6px 20px rgb(0 0 0 / 15%);
  }
`;

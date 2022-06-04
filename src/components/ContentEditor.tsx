import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { documentState } from '../atoms';
import { DocumentData } from 'firebase/firestore';

interface IEditorProps {
  showEditor: boolean;
}

export default function ContentEditor({ showEditor }: IEditorProps) {
  const params = useParams();
  const documents = useRecoilValue(documentState);
  const [content, setContent] = useState<DocumentData>();

  useEffect(() => {
    const newContent = documents.find(doc => doc.id === params['id']);
    setContent(newContent);
  }, [documents, params]);

  useEffect(() => {
    const el = document.querySelector('.toastui-editor-mode-switch');
    if (el) (el as HTMLElement).style.display = 'none';
  }, []);

  return (
    <Container className="show-editor-trigger" showEditor={showEditor}>
      {params['id'] ? (
        <>
          <HeaderContainer>
            <EditorTitle>{content?.title}</EditorTitle>
          </HeaderContainer>
          <EditorContainer>
            <Editor
              previewStyle="vertical"
              height="100%"
              initialEditType="wysiwyg"
              useCommandShortcut={true}
              toolbarItems={[
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task'],
                ['image', 'link'],
              ]}
              placeholder="설명"
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

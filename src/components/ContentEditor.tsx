import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import { useEffect } from 'react';

interface IEditorProps {
  showEditor: boolean;
}

export default function ContentEditor({ showEditor }: IEditorProps) {
  useEffect(() => {
    const el = document.querySelector('.toastui-editor-mode-switch');
    if (el) (el as HTMLElement).style.display = 'none';
  }, []);
  return (
    <Container className="show-editor-trigger" showEditor={showEditor}>
      <HeaderContainer></HeaderContainer>
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
        />
      </EditorContainer>
    </Container>
  );
}

const HeaderContainer = styled.div`
  height: 50px;
`;
const EditorContainer = styled.div`
  height: calc(100% - 50px);
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

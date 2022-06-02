import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedContentState, paramState } from '../atoms';
import { Title } from '../style/main-page';
import { useForm } from 'react-hook-form';

interface IEditorProps {
  showEditor: boolean;
}

export default function ContentEditor({ showEditor }: IEditorProps) {
  const setParams = useSetRecoilState(paramState);
  const content = useRecoilValue(selectedContentState);
  const params = useParams();
  const { register, setValue } = useForm();

  useEffect(() => {
    if (params['id']) {
      setParams(params['id']);
    }
  }, [params, setParams]);

  useEffect(() => {
    setValue('title', content?.title);
  }, [content, setValue]);

  useEffect(() => {
    const el = document.querySelector('.toastui-editor-mode-switch');
    if (el) (el as HTMLElement).style.display = 'none';
  }, []);

  return (
    <Container className="show-editor-trigger" showEditor={showEditor}>
      {params['id'] ? (
        <>
          <HeaderContainer>
            <Title
              type="text"
              defaultValue={content?.title}
              {...register('title')}
            />
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
            />
          </EditorContainer>
        </>
      ) : (
        <div>세부사항을 보려면 할일 혹은 노트의 제목을 클릭하세요.</div>
      )}
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

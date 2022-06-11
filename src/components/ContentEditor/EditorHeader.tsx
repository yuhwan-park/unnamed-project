import { selectedDocumentState } from 'atoms';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function EditorHeader() {
  const document = useRecoilValue(selectedDocumentState);

  return (
    <HeaderContainer>
      <EditorTitle>{document?.title}</EditorTitle>
    </HeaderContainer>
  );
}

export default EditorHeader;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const EditorTitle = styled.div`
  width: 100%;
  padding: 5px 10px;
  font-weight: 700;
`;

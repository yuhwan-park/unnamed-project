import { selectedDocumentState } from 'atoms';
import ListMenu from 'components/list/ListMenu';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function EditorHeader() {
  const document = useRecoilValue(selectedDocumentState);

  return (
    <Wrapper>
      <EditorTitle>{document?.title}</EditorTitle>

      <MenuContainer>
        {document && <ListMenu item={document} isEditor={true} />}
      </MenuContainer>
    </Wrapper>
  );
}

export default EditorHeader;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const EditorTitle = styled.div`
  width: 100%;
  padding: 5px 10px;
  font-weight: 700;
`;

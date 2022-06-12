import { selectedDocumentState } from 'atoms';
import CheckBox from 'components/common/CheckBox';
import ListMenu from 'components/list/ListMenu';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function EditorHeader() {
  const document = useRecoilValue(selectedDocumentState);

  return (
    <Wrapper>
      {document && (
        <>
          <FrontMenuContainer>
            {!document.isNote && <CheckBox todo={document} />}
          </FrontMenuContainer>
          <EditorTitle>{document?.title}</EditorTitle>

          <BackMenuContainer>
            <ListMenu item={document} isEditor={true} />
          </BackMenuContainer>
        </>
      )}
    </Wrapper>
  );
}

export default EditorHeader;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const FrontMenuContainer = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const BackMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const EditorTitle = styled.div`
  width: 100%;
  padding: 5px 10px 5px 5px;
  font-weight: 700;
`;

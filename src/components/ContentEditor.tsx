import styled from 'styled-components';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useState } from 'react';

interface IEditorProps {
  detail: boolean;
}

export default function ContentEditor({ detail }: IEditorProps) {
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <Container className="detail-trigger" detail={detail}>
      asdasdsadas
    </Container>
  );
}

const Container = styled.div<IEditorProps>`
  background-color: white;
  height: 100%;
  @media (max-width: 1024px) {
    transition: right 0.2s ease-in-out;
    z-index: 4;
    width: 70%;
    position: absolute;
    height: calc(100% - 50px);
    right: ${props => (props.detail ? '0' : '-100%')};
    box-shadow: 0 6px 20px rgb(0 0 0 / 15%);
  }
`;

import styled from 'styled-components';

interface IEditorProps {
  detail: boolean;
}

export default function Editor({ detail }: IEditorProps) {
  return <Container className="detail-trigger" detail={detail}></Container>;
}

const Container = styled.div<IEditorProps>`
  background-color: white;
  @media (max-width: 1024px) {
    transition: right 0.2s ease-in-out;
    z-index: 4;
    width: 70%;
    height: 100%;
    position: absolute;
    right: ${props => (props.detail ? '0' : '-100%')};
    box-shadow: 0 6px 20px rgb(0 0 0 / 15%);
  }
`;

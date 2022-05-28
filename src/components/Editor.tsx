import styled from 'styled-components';

export default function Editor() {
  return <Container></Container>;
}

const Container = styled.div`
  background-color: white;
  @media (max-width: 1024px) {
    transition: right 0.2s ease-in-out;
    z-index: 4;
    width: 70%;
    height: 100%;
    position: absolute;
    right: 0;
    box-shadow: 0 6px 20px rgb(0 0 0 / 15%);
  }
`;

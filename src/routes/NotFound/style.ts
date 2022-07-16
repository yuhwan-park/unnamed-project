import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
export const MessageContainer = styled.div`
  text-align: center;
  h2 {
    font-size: 24px;
  }
  p {
    padding: 5px 0;
  }
`;

export const Button = styled.button`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: rgba(16, 130, 253, 0.7);
  color: white;
  width: 100px;
  height: 50px;
  &:hover {
    background-color: rgba(16, 130, 253, 0.9);
  }
`;

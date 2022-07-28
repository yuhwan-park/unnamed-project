import styled from 'styled-components';

export const GoogleLogin = styled.button`
  position: relative;
  width: 100%;
  height: 40px;
  margin: 0 auto;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  img {
    position: absolute;
    left: 10px;
    top: 10px;
  }
`;

import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    margin-right: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

export const ListContainer = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  background-color: rgb(244, 244, 244);
  border-radius: 6px;
`;

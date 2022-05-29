import styled from 'styled-components';

export const List = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  margin-bottom: 6px;
  &:hover {
    .fa-ellipsis {
      opacity: 1;
    }
  }
`;

export const Title = styled.input`
  width: 100%;
  border: none;
  &:focus {
    outline: none;
  }
`;

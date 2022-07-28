import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

export const FlagContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  svg {
    padding: 10px;
    &:hover {
      background-color: rgb(240, 240, 240);
    }
  }
`;

export const FlagLabel = styled.label`
  font-size: ${props => props.theme.fontSize.small};
  color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
`;

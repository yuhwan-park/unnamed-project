import styled from 'styled-components';

export { ListHeader } from 'style/main-page';

export const Wrapper = styled.div`
  height: 100%;
`;
export const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  h1 {
    font-size: 24px;
    padding: 20px 0;
  }
  div {
    font-size: ${props => props.theme.fontSize.medium};
  }
`;

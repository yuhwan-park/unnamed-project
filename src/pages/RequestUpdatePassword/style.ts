import { FormContainer, LinkStyle } from 'style/sign-page';
import styled from 'styled-components';

export * from 'style/sign-page';

export const EFormContainer = styled(FormContainer)`
  max-width: 400px;
`;

export const ELinkStyle = styled(LinkStyle)`
  width: 100%;
  text-align: center;
  padding-top: 40px;
`;
export const Paragraph = styled.div`
  padding: 20px 0;
  font-size: ${props => props.theme.fontSize.medium};
  line-height: 24px;
`;

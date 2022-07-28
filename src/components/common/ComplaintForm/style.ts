import styled from 'styled-components';

export { CancleButton, SubmitButton } from 'style/main-page';
export { ErrorMessage } from 'style/sign-page';

export const Wrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  width: 350px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 9999;
  padding: 10px 20px;
`;

export const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  padding: 10px 0;
  line-height: 16px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  label {
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: 700;
    padding: 8px 0;
  }
`;

export const ComplaintInput = styled.input`
  padding: 0 10px;
  border: none;
  height: 42px;
  border-radius: 6px;
  outline: none;
  background-color: rgb(244, 244, 244);
`;

export const ComplaintTextArea = styled.textarea`
  padding: 10px;
  border: none;
  height: 100px;
  max-width: 400px;
  outline: none;
  background-color: rgb(244, 244, 244);
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
`;

import styled from 'styled-components';

export const Logo = styled.h1`
  font-size: 96px;
`;

export const Hr = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  margin: 20px 0;
  color: #bbb;
  font-size: ${props => props.theme.fontSize.small};

  &::before {
    content: '';
    flex-grow: 1;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    font-size: 0px;
    line-height: 0px;
  }
  &::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    margin-left: 10px;
    font-size: 0px;
    line-height: 0px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: rgb(253, 253, 253);
`;

export const FormContainer = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 50px;
  min-width: 400px;
`;

export const Message = styled.div`
  padding-top: 20px;
  text-align: center;
  font-size: ${props => props.theme.fontSize.medium};
`;

export const LinkStyle = styled.span`
  display: inline-block;
  font-size: ${props => props.theme.fontSize.medium};
  color: ${props => props.theme.dailColor.normal};
  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  font-size: ${props => props.theme.fontSize.small};
  padding: 4px 0;
  color: rgba(255, 0, 0, 0.6);
`;

export const TextInput = styled.input`
  padding: 20px 10px 10px 30px;
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transition: border-bottom 0.25s ease-in-out;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${props => props.theme.dailColor.normal};
  }
  &::placeholder {
    color: #bbb;
  }
`;

export const SubmitInput = styled.input`
  cursor: pointer;
  background-color: ${props => props.theme.dailColor.normal};
  border: none;
  color: white;
  font-size: ${props => props.theme.fontSize.medium};
  padding: 10px 0;
  margin-top: 20px;
  font-weight: 600;
  transition: background-color 0.15s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.dailColor.darker};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 18px;
    left: 5px;
    font-size: 20px;
    color: #bbb;
    transition: color 0.25s ease-in-out;
  }
  &:focus-within {
    svg {
      color: ${props => props.theme.dailColor.normal};
    }
  }
`;

import styled from 'styled-components';

export const FormContainer = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    border: none;
    border-radius: 6px;
    outline: none;
    background-color: rgb(244, 244, 244);
  }
  select {
    position: absolute;
    right: 0;
    border: none;
    border-left: 1px solid #bbb;
    border-radius: 6px;
    height: 100%;
    outline: none;
    background-color: rgb(244, 244, 244);
  }
`;

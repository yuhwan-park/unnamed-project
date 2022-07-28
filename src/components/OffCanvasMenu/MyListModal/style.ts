import { motion } from 'framer-motion';
import styled from 'styled-components';

export { ErrorMessage } from 'style/sign-page';

export { CancleButton, SubmitButton } from 'style/main-page';

export const ListModalCover = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1050;
`;

export const ListModal = styled(motion.div)`
  position: relative;
  top: 10%;
  width: 100vw;
  height: fit-content;
  max-width: 420px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
`;

export const ListModalBody = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

export const ListModalInput = styled.input`
  padding: 0 10px;
  margin: 20px 0 8px 0;
  border: none;
  height: 42px;
  border-radius: 6px;
  outline: none;
  background-color: rgb(244, 244, 244);
`;

export const ListModalHeader = styled.div`
  padding: 0 20px;
  display: flex;
  min-height: 56px;
  align-items: center;
  justify-content: space-between;
  svg {
    color: ${({ theme }) => theme.iconColor};
    cursor: pointer;
    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;

export const ListModalFooter = styled.div`
  padding: 30px 20px;
  display: flex;
  justify-content: flex-end;
`;

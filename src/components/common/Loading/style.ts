import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: white;
`;

export const Logo = styled(motion.div)`
  font-size: 124px;
  opacity: 1;
  font-family: 'Comfortaa', cursive;
  color: #1082fd;
  user-select: none;
`;

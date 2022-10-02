import { motion } from 'framer-motion';
import { devices } from 'style/media-queries';
import styled from 'styled-components';

export const Wrapper = styled(motion.nav)`
  height: 100%;
  background-color: rgb(244, 244, 244);
  width: 350px;
  overflow-x: hidden;
  overflow-y: scroll;
  @media ${devices.laptop} {
    position: absolute;
    z-index: 10;
    box-shadow: 0 6px 20px rgb(0 0 0 / 15%);
  }
  &::-webkit-scrollbar {
    width: 4px;
    margin-right: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
`;

export const MainMenuContainer = styled.div`
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid rgba(24, 24, 24, 0.1);
`;

import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
`;

export const ResponsiveContainer = styled.main`
  display: flex;
  height: calc(100vh - 50px);
`;

export const EditorContainer = styled(motion.section)`
  z-index: 30;
  width: 70%;
  position: absolute;
  height: calc(100vh - 50px);
  box-shadow: 0 6px 20px rgb(0 0 0 / 15%);
`;

import { motion } from 'framer-motion';
import styled from 'styled-components';

function Loading() {
  return (
    <Wrapper>
      <Logo
        className="logo"
        animate={{ opacity: 0.2 }}
        transition={{ repeat: Infinity, duration: 0.6, repeatType: 'mirror' }}
        draggable
      >
        dail
      </Logo>
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.div`
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

const Logo = styled(motion.div)`
  font-size: 124px;
  opacity: 1;
`;

import { motion } from 'framer-motion';
import { devices } from 'style/media-queries';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  padding: 10px 0;
  margin: 0 auto;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 6%);
`;

export const StartButton = styled(motion.div)`
  font-weight: 700;
  cursor: pointer;
  border: 2px solid rgb(16, 130, 253);
  border-radius: 5px;
  background-color: white;
  padding: 20px 50px;
`;

export const Paragraph = styled.div`
  width: 80%;
  text-align: center;

  font-size: 48px;
  font-weight: 700;
  text-shadow: rgb(0 0 0 / 10%) 2px 2px 4px;
  padding: 20px 0;
  p {
    padding: 10px 0;
  }
  @media (min-width: 470px) and (max-width: 624px) {
    font-size: 36px;
  }
  @media (max-width: 470px) {
    font-size: 24px;
  }

  span {
    color: #1082fd;
  }
`;

export const Logo = styled.div`
  font-size: 48px;
  font-family: 'Comfortaa', cursive;
  color: #1082fd;
  width: 40%;
  padding-left: 30px;
  user-select: none;
  @media ${devices.mobileL} {
    width: 50%;
    padding-left: 20px;
  }
`;

export const ShapeDivider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: -1;
  transform: rotate(180deg);
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 40vh;
    transform: rotateY(180deg);
  }
  .shape-fill {
    fill: #1082fd;
  }
`;

export const Links = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
  word-break: keep-all;
  a {
    color: black;
    padding: 0 20px;
    font-size: 16px;
    &:hover {
      font-weight: 700;
    }
  }
  @media (max-width: 480px) {
    width: 50%;
    a {
      font-size: 14px;
      padding: 0 10px;
    }
  }
`;

import { motion } from 'framer-motion';
import { devices } from 'style/media-queries';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #474747;
`;

export const Today = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 200px;
  height: 50px;
  font-size: 18px;
  color: white;
  font-family: ${props => props.theme.fontFamily.main};
`;

export const CalendarContainer = styled.div`
  position: absolute;
  top: 40px;
  z-index: 300;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
`;

export const Button = styled.div`
  svg {
    cursor: pointer;
    color: white;
    font-size: 30px;
  }
`;

export const PrevButton = styled(Button)`
  position: relative;
  left: -100px;
  z-index: 1;
  @media ${devices.mobileL} {
    left: -70px;
  }
`;

export const NextButton = styled(Button)`
  position: relative;
  right: -100px;
  @media ${devices.mobileL} {
    right: -70px;
  }
`;

export const MenuIcon = styled(Button)`
  position: absolute;
  left: 30px;
  z-index: 10;
  padding-right: 10px;
`;

export const ComplaintContainer = styled.div`
  position: absolute;
  right: 0;
  padding: 0 10px;
`;

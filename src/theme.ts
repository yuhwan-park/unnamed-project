import { DefaultTheme } from 'styled-components';

export const Theme: DefaultTheme = {
  dailColor: {
    normal: '#1082FD',
    lighter: '#6bb1ff',
    darker: '#0057c9',
  },
  fontSize: {
    medium: '14px',
    small: '12px',
  },
  fontFamily: {
    main: `'Nanum Gothic', sans-serif`,
  },
  iconColor: 'rgba(0, 0, 0, 0.3)',
  hoverColor: {
    icon: 'rgba(0, 0, 0, 0.6)',
  },
  textEllipsis: () => `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  `,
};

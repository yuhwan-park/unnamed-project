import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fontSize: {
      large: string;
      medium: string;
      small: string;
    };
    letterSpacing: {
      body1: string;
      body2: string;
      caption: string;
      button: string;
    };
  }
}

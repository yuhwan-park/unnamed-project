import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    dailColor: {
      lighter: string;
      normal: string;
      darker: string;
    };
    fontSize: {
      medium: string;
      small: string;
    };
  }
}

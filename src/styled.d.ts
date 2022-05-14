import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    dailColor: string;
    fontSize: {
      large: string;
      medium: string;
      small: string;
    };
  }
}

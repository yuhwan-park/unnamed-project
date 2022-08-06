import ReactDOM from 'react-dom/client';
import App from 'App';
import { ThemeProvider } from 'styled-components';
import { Theme } from 'theme';
import { RecoilRoot } from 'recoil';
import 'react-reflex/styles.css';
import 'assets/fonts.css';
import { GlobalStyle } from 'style/GlobalStyle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <RecoilRoot>
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>,
);

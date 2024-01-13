import Router from 'routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from 'style/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { Theme } from 'theme';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;

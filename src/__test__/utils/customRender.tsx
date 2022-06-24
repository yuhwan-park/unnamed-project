import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import { Theme } from 'theme';
import { ThemeProvider } from 'styled-components';
import App from 'App';

const customRender = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(
      <RecoilRoot>
        <ThemeProvider theme={Theme}>
          <App />
        </ThemeProvider>
      </RecoilRoot>,
    ),
  };
};

export { customRender as render };

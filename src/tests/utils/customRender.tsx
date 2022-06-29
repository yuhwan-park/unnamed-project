import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import { Theme } from 'theme';
import { ThemeProvider } from 'styled-components';
import { ReactElement } from 'react';

const customRender = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(
      <RecoilRoot>
        <ThemeProvider theme={Theme}>{ui}</ThemeProvider>
      </RecoilRoot>,
    ),
  };
};

export { customRender as render };

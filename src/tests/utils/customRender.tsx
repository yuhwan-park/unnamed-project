import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { Theme } from 'theme';

const customRender = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(
      <RecoilRoot>
        <ThemeProvider theme={Theme}>
          {route ? (
            <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
          ) : (
            <>{ui}</>
          )}
        </ThemeProvider>
      </RecoilRoot>,
    ),
  };
};

export { customRender as render };

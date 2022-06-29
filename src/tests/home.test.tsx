import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from 'App';
import { render } from './utils';

describe('홈페이지 버튼 테스트', () => {
  test('로그인 버튼을 클릭하면 signin 페이지로 이동한다', async () => {
    const { user } = render(<App />);

    const link = screen.getByRole('link', { name: '로그인' });

    expect(link).toBeInTheDocument();
    await user.click(link);

    expect(window.location.pathname).toBe('/signin');
  });

  test('회원가입 버튼을 클릭하면 Signup 페이지로 이동한다', async () => {
    const { user } = render(<App />);

    const link = screen.getByRole('link', { name: '회원가입' });

    expect(link).toBeInTheDocument();
    await user.click(link);

    expect(window.location.pathname).toBe('/signup');
  });

  test('시작하기 버튼을 클릭하면 Signup 페이지로 이동한다', async () => {
    const { user } = render(<App />);

    const link = screen.getByRole('link', { name: '시작하기' });

    expect(link).toBeInTheDocument();
    await user.click(link);

    expect(window.location.pathname).toBe('/signup');
  });
});

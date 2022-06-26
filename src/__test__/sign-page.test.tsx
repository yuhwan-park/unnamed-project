import { screen } from '@testing-library/react';
import { render } from './utils/customRender';
import '@testing-library/jest-dom';

describe('로그인 페이지 링크 기능', () => {
  test('dail 로고를 클릭하면 home 페이지로 이동한다', async () => {
    const { user } = render({ route: '/signin' });
    const logo = screen.getByText('dail');

    expect(logo).toBeInTheDocument();
    await user.click(logo);
    expect(window.location.pathname).toBe('/');
  });

  test('비밀번호 찾기 페이지 링크를 클릭하면 requestUpdatePassword 페이지로 이동한다', async () => {
    const { user } = render({ route: '/signin' });
    const link = screen.getByRole('link', {
      name: '비밀번호가 기억나지 않아요',
    });

    expect(link).toBeInTheDocument();
    await user.click(link);
    expect(window.location.pathname).toBe('/requestUpdatePassword');
  });

  test('회원가입 링크를 클릭하면 signup 페이지로 이동한다', async () => {
    const { user } = render({ route: '/signin' });
    const link = screen.getByRole('link', { name: '회원가입' });

    expect(link).toBeInTheDocument();
    await user.click(link);
    expect(window.location.pathname).toBe('/signup');
  });
});

describe('회원가입 페이지 링크 기능', () => {
  test('dail 로고를 클릭하면 home 페이지로 이동한다', async () => {
    const { user } = render({ route: '/signup' });
    const logo = screen.getByText('dail');

    expect(logo).toBeInTheDocument();
    await user.click(logo);
    expect(window.location.pathname).toBe('/');
  });

  test('로그인 링크를 클릭하면 signin 페이지로 이동한다', async () => {
    const { user } = render({ route: '/signup' });
    const link = screen.getByRole('link', { name: '로그인' });

    expect(link).toBeInTheDocument();
    await user.click(link);
    expect(window.location.pathname).toBe('/signin');
  });
});

describe('회원가입 & 로그인 폼 유효성 검사', () => {
  test('이메일과 비밀번호를 입력하지 않고 로그인 버튼을 누를 시 에러메세지가 보인다', async () => {
    const { user } = render({ route: '/signup' });
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submitButton = screen.getByRole('button', { name: '회원가입' });

    expect(email).toHaveTextContent('');
    expect(password).toHaveTextContent('');
    expect(submitButton).toBeInTheDocument();
    await user.click(submitButton);

    expect(await screen.findAllByText(/필수 항목입니다/i)).toHaveLength(2);
  });
});

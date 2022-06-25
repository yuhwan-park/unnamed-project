import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from './utils/customRender';

describe('홈페이지 버튼 테스트', () => {
  test('로그인 버튼을 클릭하면 Signin 페이지로 이동한다', async () => {
    const { user } = render();

    const link = screen.getByRole('link', { name: '로그인' });

    expect(link).toBeInTheDocument();
    await user.click(link);

    // signin 페이지에만 있는 Text
    expect(screen.getByText(/계정이 없으신가요/i)).toBeInTheDocument();
  });
  test('회원가입 버튼을 클릭하면 Signup 페이지로 이동한다', async () => {
    const { user } = render();

    const link = screen.getByRole('link', { name: '회원가입' });

    expect(link).toBeInTheDocument();
    await user.click(link);

    // signup 페이지에만 있는 Text
    expect(screen.getByText(/이미 계정이 있으신가요/i)).toBeInTheDocument();
  });
  test('시작하기 버튼을 클릭하면 Signup 페이지로 이동한다', async () => {
    const { user } = render();

    const link = screen.getByRole('link', { name: '시작하기' });

    expect(link).toBeInTheDocument();
    await user.click(link);

    // signup 페이지에만 있는 Text
    expect(screen.getByText(/이미 계정이 있으신가요/i)).toBeInTheDocument();
  });
});

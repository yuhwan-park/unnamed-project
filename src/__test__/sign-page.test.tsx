import { screen, waitFor } from '@testing-library/react';
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
  test('이메일과 비밀번호를 입력하지 않고 로그인 버튼을 누를 시 required 에러가 발생한다', async () => {
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

  test('이메일 형식에 부합하지 않을 시 validation 에러가 발생한다', async () => {
    const { user } = render({ route: '/signup' });
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submitButton = screen.getByRole('button', { name: '회원가입' });

    expect(email).toHaveTextContent('');
    expect(password).toHaveTextContent('');
    await user.type(email, 'this_is_not_email');
    await user.type(password, '12345678');
    await user.click(submitButton);

    expect(
      await screen.findByText(/이메일 형식에 맞지 않습니다/i),
    ).toBeInTheDocument();
  });

  test('입력한 비밀번호가 8자 이하일 시 validation 에러가 발생한다', async () => {
    const { user } = render({ route: '/signup' });
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submitButton = screen.getByRole('button', { name: '회원가입' });

    expect(email).toHaveTextContent('');
    expect(password).toHaveTextContent('');
    await user.type(email, 'thisis@email.com');
    await user.type(password, '1234');
    await user.click(submitButton);

    expect(
      await screen.findByText(/8자 이상 입력해주세요/i),
    ).toBeInTheDocument();
  });
});

describe('로그인 & 회원가입', () => {
  // 테스트를 위하여 미리 생성해둔 계정
  const TEST_ACCOUNT = {
    ID: 'form-test@test.com',
    PW: '12345678',
  };

  test('회원가입 되지않은 이메일로 로그인 시도를 할 시 에러가 발생한다', async () => {
    const { user } = render({ route: '/signin' });
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submitButton = screen.getByRole('button', { name: '로그인' });

    expect(email).toHaveTextContent('');
    expect(password).toHaveTextContent('');
    await user.type(email, 'unregistered@email.com');
    await user.type(password, '12345678');
    await user.click(submitButton);

    expect(
      await screen.findByText(/등록되지 않은 이메일입니다/i),
    ).toBeInTheDocument();
  });

  test('잘못된 비밀번호를 입력했을 시 에러가 발생한다', async () => {
    const { user } = render({ route: '/signin' });
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submitButton = screen.getByRole('button', { name: '로그인' });

    expect(email).toHaveTextContent('');
    expect(password).toHaveTextContent('');
    await user.type(email, TEST_ACCOUNT.ID);
    await user.type(password, 'wrongPassword');
    await user.click(submitButton);

    expect(
      await screen.findByText(/잘못된 비밀번호를 입력하였습니다/i),
    ).toBeInTheDocument();
  });

  test('이미 등록된 이메일로 회원가입을 시도할 시 에러가 발생한다', async () => {
    const { user } = render({ route: '/signup' });
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submitButton = screen.getByRole('button', { name: '회원가입' });

    expect(email).toHaveTextContent('');
    expect(password).toHaveTextContent('');
    await user.type(email, TEST_ACCOUNT.ID);
    await user.type(password, TEST_ACCOUNT.PW);
    await user.click(submitButton);

    expect(
      await screen.findByText(/이미 등록된 이메일입니다/i),
    ).toBeInTheDocument();
  });

  test('로그인에 성공하였을 시 main route로 이동한다', async () => {
    const { user } = render({ route: '/signin' });
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submitButton = screen.getByRole('button', { name: '로그인' });

    expect(email).toHaveTextContent('');
    expect(password).toHaveTextContent('');
    await user.type(email, TEST_ACCOUNT.ID);
    await user.type(password, TEST_ACCOUNT.PW);
    await user.click(submitButton);

    await waitFor(() => expect(window.location.pathname).toBe('/main'));
  });
});

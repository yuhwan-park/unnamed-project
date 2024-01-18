import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { AuthFormData } from '@types';
import AuthForm from 'components/auth/AuthForm';
import { render } from './utils';

const invalidEmailList = [
  '#@%^%#$@#$@#.com',
  '@example.com',
  'Joe Smith <email@example.com>',
  'email.example.com',
  'email@example@example.com',
  '.email@example.com',
  'email.@example.com',
  'email..email@example.com',
  'あいうえお@example.com',
  'email@example.com (Joe Smith)',
  'email@example',
  'email@-example.com',
  'email@111.222.333.44444',
  'email@example..com',
  'Abc..123@example.com',
  '“(),:;<>@example.com',
  `just"not"right@example.com`,
  `this is"really"notallowed@example.com`,
];

const mockOnSubmit = jest.fn(async (_: AuthFormData) => {});

describe('회원가입 & 로그인 폼 유효성 검사', () => {
  test('이메일과 비밀번호를 입력하지 않고 로그인 버튼을 누를 시 required 에러가 발생한다', async () => {
    const { user } = render(<AuthForm onSubmit={mockOnSubmit} />);
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submitButton = screen.getByRole('button');

    expect(email).toHaveTextContent('');
    expect(password).toHaveTextContent('');
    await user.click(submitButton);

    expect(await screen.findAllByText(/필수 항목입니다/i)).toHaveLength(2);
  });

  test.each(invalidEmailList)(
    '이메일 형식에 부합하지 않을 시 validation 에러가 발생한다',
    async invalidEmail => {
      const { user } = render(<AuthForm onSubmit={mockOnSubmit} />);
      const email = screen.getByPlaceholderText('이메일');
      const password = screen.getByPlaceholderText('비밀번호');
      const submitButton = screen.getByRole('button');

      expect(email).toHaveTextContent('');
      expect(password).toHaveTextContent('');
      await user.type(email, invalidEmail);
      await user.type(password, '12345678');
      await user.click(submitButton);
      try {
        expect(
          await screen.findByText(/이메일 형식에 맞지 않습니다/i),
        ).toBeInTheDocument();
      } catch (e) {
        console.error('test failed with invalid email:', invalidEmail);
        throw e;
      }
    },
  );

  test('입력한 비밀번호가 8자 이하일 시 validation 에러가 발생한다', async () => {
    const { user } = render(<AuthForm onSubmit={mockOnSubmit} />);
    const email = screen.getByPlaceholderText('이메일');
    const password = screen.getByPlaceholderText('비밀번호');
    const submitButton = screen.getByRole('button');

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

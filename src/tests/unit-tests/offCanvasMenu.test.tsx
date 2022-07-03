import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { myListsState, userState } from 'atoms';
import GlobalLogic from 'components/common/GlobalLogic';
import CalendarList from 'components/offCanvas/CalendarList';
import ShowAllList from 'components/offCanvas/ShowAllList';
import UserAccount from 'components/offCanvas/UserAccount';
import OffCanvasMenu from 'components/OffCanvasMenu';
import { BrowserRouter } from 'react-router-dom';
import { RecoilObserver, RecoilSetter, render } from 'tests/utils';

const MOCK_USER = {
  displayName: 'aa',
  uid: '12345678',
  photoURL:
    'https://lh3.googleusercontent.com/a/AATXAJxlR7TxjAQtCpdK2R8WpETgE4bayzI6D6oi7sfA=s96-c',
  email: 'form-test@test.com',
};

describe('오프캔버스 메뉴 기능 테스트', () => {
  describe('유저 정보 기능', () => {
    test('마운트 되었을 때 유저의 닉네임(이메일), 프로필 사진이 나온다', () => {
      render(
        <>
          <RecoilSetter atom={userState} data={MOCK_USER} />
          <UserAccount />
        </>,
        { route: '/main' },
      );

      const displayName = screen.getByText(new RegExp(MOCK_USER.displayName));

      expect(displayName).toBeInTheDocument();
    });

    test('닉네임을 클릭 시 input으로 바뀌며 닉네임을 변경할 수 있다', async () => {
      const { user } = render(
        <>
          <RecoilSetter atom={userState} data={MOCK_USER} />
          <UserAccount />
        </>,
        { route: '/main' },
      );

      const displayName = screen.getByText(new RegExp(MOCK_USER.displayName));
      expect(displayName).toBeInTheDocument();

      await user.click(displayName);

      const nameInput = screen.getByDisplayValue(MOCK_USER.displayName);
      expect(nameInput).toBeInTheDocument();

      await user.type(nameInput, '{backspace}{backspace}ChangedName{enter}');

      expect(
        screen.getByRole('heading', { name: 'ChangedName' }),
      ).toBeInTheDocument();
    });

    test('톱니바퀴 아이콘을 클릭 시 메뉴 모달이 나타나며 로그아웃을 클릭 시 로그아웃된다', async () => {
      const { user } = render(
        <BrowserRouter>
          <RecoilSetter atom={userState} data={MOCK_USER} />
          <GlobalLogic />
          <UserAccount />
        </BrowserRouter>,
        { route: '/main' },
      );

      const menuIcon = screen.getByTestId('user-menu');

      expect(screen.queryByText(/로그아웃/)).not.toBeInTheDocument();
      await user.click(menuIcon);

      const logoutButton = screen.getByText(/로그아웃/);
      expect(logoutButton).toBeInTheDocument();
      await user.click(logoutButton);
      expect(window.location.pathname).toBe('/');
    });

    describe('할일 필터 기능', () => {
      test('모두 보기 메뉴를 클릭 시 모든 할일을 볼 수 있는 라우트로 이동한다', async () => {
        const { user } = render(
          <BrowserRouter>
            <ShowAllList />
          </BrowserRouter>,
          { route: '/main' },
        );

        const showAll = screen.getByTestId('show-all-container');

        expect(window.location.pathname).toBe('/main');
        await user.click(showAll);
        expect(window.location.pathname).toBe('/main/all/tasks');
      });

      test('날짜별로 보기 메뉴를 클릭 시 main 라우트로 이동한다', async () => {
        const { user } = render(
          <BrowserRouter>
            <CalendarList />
          </BrowserRouter>,
          { route: '/main/all/tasks' },
        );

        const calendarListButton = screen.getByTestId(
          'calendar-list-container',
        );

        expect(window.location.pathname).toBe('/main/all/tasks');
        await user.click(calendarListButton);
        expect(window.location.pathname).toBe('/main');
      });
    });

    describe('리스트 CRUD 기능', () => {
      test('리스트 추가 버튼을 누르면 리스트 추가 모달이 나오고 리스트를 추가할 수 있다', async () => {
        const onChange = jest.fn();
        const { user } = render(
          <BrowserRouter>
            <RecoilObserver node={myListsState} onChange={onChange} />
            <OffCanvasMenu />
          </BrowserRouter>,
          { route: '/main' },
        );

        const addListButton = screen.getByTestId('add-list-button');

        await user.click(addListButton);

        expect(
          screen.getByRole('heading', { name: '리스트 추가' }),
        ).toBeInTheDocument();

        await user.type(
          screen.getByPlaceholderText(/리스트 이름을 적어주세요/),
          'TESTLIST',
        );
        const submitButton = screen.getByRole('button', { name: '확인' });
        expect(submitButton).toBeInTheDocument();
        await user.click(submitButton);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({});
      });
    });
  });
});

import { screen } from '@testing-library/react';
import Nav from 'components/common/Nav';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';
import { toggleMenuState } from 'atoms';
import { RecoilObserver, render } from 'tests/utils';

describe('Nav 컴포넌트 유닛 테스트', () => {
  test('마운트 되었을 때 당일 날짜가 텍스트로 표시되어있다', () => {
    render(<Nav />, { route: '/main' });

    const today = dayjs().format('M월 D일');
    const text = screen.getByText(new RegExp(today));
    expect(text).toBeInTheDocument();
  });

  test('< 버튼을 눌렀을 때 이전 날짜 텍스트가 렌더링된다', async () => {
    const { user } = render(<Nav />, { route: '/main' });

    const today = dayjs().format('M월 D일');
    const yesterday = dayjs().add(-1, 'day').format('M월 D일');
    const text = screen.getByText(new RegExp(today));
    const prevButton = screen.getByTestId('prev-button');

    expect(text).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    await user.click(prevButton);
    expect(screen.getByText(new RegExp(yesterday))).toBeInTheDocument();
  });

  test('> 버튼을 눌렀을 때 다음 날짜 텍스트가 렌더링된다', async () => {
    const { user } = render(<Nav />, { route: '/main' });

    const today = dayjs().format('M월 D일');
    const tomorrow = dayjs().add(1, 'day').format('M월 D일');
    const text = screen.getByText(new RegExp(today));
    const nextButton = screen.getByTestId('next-button');

    expect(text).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    await user.click(nextButton);
    expect(screen.getByText(new RegExp(tomorrow))).toBeInTheDocument();
  });

  test('날짜 텍스트가 hover되면 캘린더 아이콘으로 바뀐다', async () => {
    const { user } = render(<Nav />, { route: '/main' });

    const today = dayjs().format('M월 D일');
    const text = screen.getByText(new RegExp(today));

    expect(text).toBeInTheDocument();
    await user.hover(text);
    expect(screen.getByTestId('calendar-button')).toBeInTheDocument();
  });

  test('캘린더 아이콘을 클릭할 시 캘린더 모달이 렌더링되고 캘린더의 날짜를 클릭하면 해당 날짜로 이동한다', async () => {
    const { user } = render(<Nav />, { route: '/main' });
    const today = dayjs().format('M월 D일');
    const text = screen.getByText(new RegExp(today));
    await user.hover(text);

    const calendarButton = screen.getByTestId('calendar-button');
    expect(calendarButton).toBeInTheDocument();
    await user.click(calendarButton);

    expect(screen.getByTestId('calendar')).toBeInTheDocument();

    expect(screen.getByText(/15/)).toBeInTheDocument();
    await user.click(screen.getByText(/15/));
    expect(screen.getByText(/15일/)).toBeInTheDocument();
  });

  test('메뉴 아이콘을 클릭하면 오프캔버스 메뉴를 토글링할 수 있다', async () => {
    const onChange = jest.fn();
    const { user } = render(
      <>
        <RecoilObserver node={toggleMenuState} onChange={onChange} />
        <Nav />
      </>,
      { route: '/main' },
    );

    const menuToggleButton = screen.getByTestId('menu-toggle-button');

    expect(menuToggleButton).toBeInTheDocument();
    await user.click(menuToggleButton);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  test('이슈 제보 아이콘을 클릭하면 이슈 제보 폼이 렌더링된다', async () => {
    const { user } = render(<Nav />, { route: '/main' });

    const issueButton = screen.getByTestId('issue-button');

    expect(issueButton).toBeInTheDocument();
    await user.click(issueButton);
    expect(screen.getByText(/이슈 제보/)).toBeInTheDocument();
  });
});

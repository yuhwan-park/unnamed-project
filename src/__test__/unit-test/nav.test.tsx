import { screen } from '@testing-library/react';
import Nav from 'components/common/Nav';
import { render } from '__test__/utils/customRender';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';

describe('Nav 컴포넌트 유닛 테스트', () => {
  test('마운트 되었을 때 당일 날짜가 텍스트로 표시되어있다', () => {
    render(<Nav />, { route: '/main' });

    const today = dayjs().format('M월 D일');
    const text = screen.getByText(new RegExp(today));
    expect(text).toBeInTheDocument();
  });
});

import dayjs from 'dayjs';
import { atom, selector } from 'recoil';

export const dateState = atom<dayjs.Dayjs>({
  key: 'date',
  default: dayjs(),
});

export const dateSelector = selector<string>({
  key: 'dateSelector',
  get: ({ get }) => get(dateState).format('YYYYMMDD'),
});

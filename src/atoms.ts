import dayjs from 'dayjs';
import { DocumentData } from 'firebase/firestore';
import { atom, selector } from 'recoil';

interface IToDoData {
  [field: string]: DocumentData[];
}

export const dateState = atom<dayjs.Dayjs>({
  key: 'date',
  default: dayjs(),
});

export const dateSelector = selector<string>({
  key: 'dateSelector',
  get: ({ get }) => get(dateState).format('YYYYMMDD'),
});

export const todoState = atom<IToDoData>({
  key: 'todo',
  default: {},
});

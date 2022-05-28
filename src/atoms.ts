import dayjs from 'dayjs';
import { DocumentData } from 'firebase/firestore';
import { atom, selector } from 'recoil';

export const dateState = atom<dayjs.Dayjs>({
  key: 'date',
  default: dayjs(),
});

export const dateSelector = selector<string>({
  key: 'dateSelector',
  get: ({ get }) => get(dateState).format('YYYYMMDD'),
});

export const todoState = atom<DocumentData[]>({
  key: 'todo',
  default: [],
});
export const doingTodoState = selector({
  key: 'doingTodoSelector',
  get: ({ get }) => get(todoState).filter(todo => !todo.isDone),
});

export const doneTodoState = selector({
  key: 'doneTodoSelector',
  get: ({ get }) => get(todoState).filter(todo => todo.isDone),
});

export const noteState = atom<DocumentData[]>({
  key: 'note',
  default: [],
});

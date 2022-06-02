import dayjs from 'dayjs';
import { DocumentData } from 'firebase/firestore';
import { atom, selector } from 'recoil';

export const paramState = atom({
  key: 'param',
  default: '',
});

export const dateState = atom<dayjs.Dayjs>({
  key: 'date',
  default: dayjs(),
});

export const dateSelector = selector<string>({
  key: 'dateSelector',
  get: ({ get }) => get(dateState).format('YYYYMMDD'),
});

export const documentState = atom<DocumentData[]>({
  key: 'todo',
  default: [],
});

export const doingTodoState = selector({
  key: 'doingTodoSelector',
  get: ({ get }) =>
    get(documentState).filter(document => !document.isDone && !document.isNote),
});

export const doneTodoState = selector({
  key: 'doneTodoSelector',
  get: ({ get }) =>
    get(documentState).filter(document => document.isDone && !document.isNote),
});

export const noteState = selector({
  key: 'noteSelector',
  get: ({ get }) => get(documentState).filter(document => document.isNote),
});

export const selectedContentState = selector({
  key: 'selectedContentState',
  get: ({ get }) => {
    const documents = get(documentState);
    const params = get(paramState);

    return documents.find(document => document.id === params);
  },
});

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

export const selectedContentState = selector({
  key: 'selectedContentState',
  get: ({ get }) => {
    const todos = get(todoState);
    const notes = get(noteState);
    const params = get(paramState);

    return (
      todos.find(todo => todo.id === params) ||
      notes.find(note => note.id === params)
    );
  },
});

export const noteState = atom<DocumentData[]>({
  key: 'note',
  default: [],
});

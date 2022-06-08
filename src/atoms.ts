import dayjs from 'dayjs';
import { DocumentData } from 'firebase/firestore';
import { Params } from 'react-router-dom';
import { atom, selector } from 'recoil';
import { IMyList, IUserState } from 'types';

export const userState = atom<IUserState>({
  key: 'user',
  default: {
    displayName: '',
    uid: '',
    photoURL: '',
    email: '',
  },
});

export const paramState = atom<Params<string>>({
  key: 'param',
  default: {},
});

export const myListModalState = atom({
  key: 'myListModal',
  default: false,
});

export const dateState = atom<dayjs.Dayjs>({
  key: 'date',
  default: dayjs(),
});

export const toggleMenuState = atom({
  key: 'toggleMenu',
  default: true,
});

export const myListsState = atom<IMyList[]>({
  key: 'myLists',
  default: [],
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

export const selectedDocumentState = selector<DocumentData | undefined>({
  key: 'selectedDocumentSelector',
  get: ({ get }) => {
    const params = get(paramState);
    const documents = get(documentState);

    return documents.find(document => document.id === params['id']);
  },
});

export const selectedListState = selector({
  key: 'selectedListSelector',
  get: ({ get }) => {
    const params = get(paramState);
    const lists = get(myListsState);

    return lists.find(list => list.id === params['listId']);
  },
});

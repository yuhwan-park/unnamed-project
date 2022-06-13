import dayjs from 'dayjs';
import { Params } from 'react-router-dom';
import { atom, selector } from 'recoil';
import { IAllDocumentState, IDocument, IMyList, IUserState } from 'types';

export const userState = atom<IUserState>({
  key: 'user',
  default: {
    displayName: '',
    uid: '',
    photoURL: '',
    email: '',
  },
});

export const loadingState = atom({
  key: 'loading',
  default: {
    allDoc: false,
    doc: false,
    myLists: false,
  },
});

export const loadingSelector = selector({
  key: 'loadingSelector',
  get: ({ get }) => {
    const loading = get(loadingState);
    return Boolean(Object.values(loading).filter(val => !val).length);
  },
});

export const paramState = atom<Params<string>>({
  key: 'param',
  default: {},
});

export const myListModalState = atom<'Edit' | 'Create' | 'Delete' | null>({
  key: 'myListModal',
  default: null,
});

export const dateState = atom<dayjs.Dayjs>({
  key: 'date',
  default: dayjs(),
});

export const dateSelector = selector<string>({
  key: 'dateSelector',
  get: ({ get }) => get(dateState).format('YYYYMMDD'),
});

export const toggleMenuState = atom({
  key: 'toggleMenu',
  default: true,
});

// ******************
// * Document State *
// ******************

export const allDocumentState = atom<IAllDocumentState>({
  key: 'allDocument',
  default: {},
});

export const allDocumentSelector = selector({
  key: 'allDocumentSelector',
  get: ({ get }) => {
    const allDocuments = get(allDocumentState);
    const sorted = Object.values(allDocuments).sort(
      (a, b) => Number(a.date) - Number(b.date),
    );
    return sorted;
  },
});

interface IdocumentCountByDateState {
  [key: string]: number;
}

export const documentCountByDateState = atom<IdocumentCountByDateState>({
  key: 'documentCount',
  default: {},
});

export const documentState = atom<IDocument[]>({
  key: 'todo',
  default: [],
});

export const myListsState = atom<IMyList[]>({
  key: 'myLists',
  default: [],
});

export const myListDocsState = atom<IDocument[]>({
  key: 'myListDocs',
  default: [],
});

export const selectedDocumentState = selector({
  key: 'selectedDocumentSelector',
  get: ({ get }) => {
    const params = get(paramState);
    const myListDocs = get(myListDocsState);
    const allDocs = get(allDocumentSelector);

    if (params['listId']) {
      return myListDocs.find(document => document.id === params['id']);
    }
    return allDocs.find(document => document.id === params['id']);
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

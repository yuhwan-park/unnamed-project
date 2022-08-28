import dayjs from 'dayjs';
import { Params } from 'react-router-dom';
import { atom, selector } from 'recoil';
import { IDocument, IMyList, IUserState } from 'types';

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
  default: false,
});

export const screenStatusState = atom<'All' | 'Date' | 'List'>({
  key: 'screenStatus',
  default: selector({
    key: 'screenStatus/selector',
    get: () => {
      const { href } = window.location;
      return href.includes('all')
        ? 'All'
        : href.includes('lists')
        ? 'List'
        : 'Date';
    },
  }),
});

export const showEditorState = atom({
  key: 'showEditor',
  default: false,
});

export const isWideState = atom({
  key: 'isWide',
  default: window.innerWidth > 1024,
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

export const allDocumentState = atom<{ [key: string]: IDocument }>({
  key: 'allDocument',
  default: {},
});

export const allDocumentSelector = selector({
  key: 'allDocumentSelector',
  get: ({ get }) => {
    const allDocuments = get(allDocumentState);
    const sorted = Object.values(allDocuments).sort(
      (a, b) => a.createdAt.seconds - b.createdAt.seconds,
    );
    return sorted;
  },
});

export const docIdsState = atom<string[]>({
  key: 'docIds',
  default: [],
});

export const docIdsByDateState = atom<{ [key: string]: string[] }>({
  key: 'docIdsByDate',
  default: {},
});

export const documentsById = selector({
  key: 'documentsById',
  get: ({ get }) => {
    const docIds = get(docIdsState);
    const allDocs = get(allDocumentState);
    return docIds
      .map(id => allDocs[id])
      .sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
  },
});

export const documentCountByDateState = atom<{ [key: string]: number }>({
  key: 'documentCount',
  default: {},
});

export const myListsState = atom<{ [key: string]: IMyList }>({
  key: 'myLists',
  default: {},
});

export const myListsArray = selector({
  key: 'myListsArray',
  get: ({ get }) => {
    const myLists = get(myListsState);
    return Object.values(myLists).sort(
      (a, b) => a.createdAt.seconds - b.createdAt.seconds,
    );
  },
});

export const selectedDocumentState = selector({
  key: 'selectedDocumentSelector',
  get: ({ get }) => {
    const params = get(paramState);
    const allDocs = get(allDocumentState);

    return params['id'] ? allDocs[params['id']] : undefined;
  },
});

export const selectedListState = selector({
  key: 'selectedListSelector',
  get: ({ get }) => {
    const params = get(paramState);
    const lists = get(myListsState);

    return params['listId'] ? lists[params['listId']] : undefined;
  },
});

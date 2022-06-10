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

export const myListModalState = atom<'Edit' | 'Create' | 'Delete' | null>({
  key: 'myListModal',
  default: null,
});

// export const myListModalSelector = selector({
//   key: 'myListModalSelector',
//   get: ({ get }) => {
//     const modalTrigger = get(myListModalState);
//     if (!modalTrigger) return null;
//     const [key, id] = modalTrigger.split('-');
//     if (key === 'Create') return [key, ''];
//     if (key === 'Edit' || 'Delete') return [key, id];
//   },
// });

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

export const documentState = atom<DocumentData[]>({
  key: 'todo',
  default: [],
});

export const myListsState = atom<IMyList[]>({
  key: 'myLists',
  default: [],
});

export const myListDocsState = atom<DocumentData[]>({
  key: 'myListDocs',
  default: [],
});

export const selectedDocumentState = selector<DocumentData | undefined>({
  key: 'selectedDocumentSelector',
  get: ({ get }) => {
    const params = get(paramState);
    const documents = get(documentState);
    const myListDocs = get(myListDocsState);

    if (params['listId']) {
      return myListDocs.find(document => document.id === params['id']);
    }
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

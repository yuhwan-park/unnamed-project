import { atom, selector } from 'recoil';
import { Document } from '@types';
import { paramState } from './paramState';
import { snapshotEffect } from 'utils';
import { myListsState } from './myListsState';
import { dateSelector } from './dateState';
import { docIdsByDateState } from './docIdsByDateState';

type DocMap = { [key: string]: Document };

export const allDocumentState = atom<DocMap>({
  key: 'allDocument',
  default: { isLoading: {} as Document },
  effects: [snapshotEffect('All')],
});

export const allDocumentSelector = selector({
  key: 'allDocumentSelector',
  get: ({ get }) => {
    const allDocuments = get(allDocumentState);
    const sorted = Object.values(allDocuments).sort(
      (a, b) => a.createdAt?.seconds - b.createdAt?.seconds,
    );
    return sorted;
  },
});

export const documentsSelector = selector({
  key: 'documentsSelector',
  get: ({ get }) => {
    const params = get(paramState);
    const myLists = get(myListsState);
    const selectedDate = get(dateSelector);
    const docIdsByDate = get(docIdsByDateState);
    const allDocs = get(allDocumentState);

    const docIds = params['listId']
      ? myLists[params['listId']].docIds
      : selectedDate
      ? docIdsByDate[selectedDate] ?? []
      : [];

    return docIds
      .map(id => allDocs[id])
      .sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
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

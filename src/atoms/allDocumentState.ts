import { atom, selector } from 'recoil';
import { Document } from '@types';
import { paramState } from './paramState';

type DocMap = { [key: string]: Document };

export const allDocumentState = atom<DocMap>({
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

export const selectedDocumentState = selector({
  key: 'selectedDocumentSelector',
  get: ({ get }) => {
    const params = get(paramState);
    const allDocs = get(allDocumentState);

    return params['id'] ? allDocs[params['id']] : undefined;
  },
});

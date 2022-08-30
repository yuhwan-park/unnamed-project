import { atom, selector } from 'recoil';
import { IDocument } from 'types';
import { paramState } from './paramState';

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

export const selectedDocumentState = selector({
  key: 'selectedDocumentSelector',
  get: ({ get }) => {
    const params = get(paramState);
    const allDocs = get(allDocumentState);

    return params['id'] ? allDocs[params['id']] : undefined;
  },
});

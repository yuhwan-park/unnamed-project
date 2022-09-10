import { atom, selector } from 'recoil';
import { Document } from '@types';
import { fetchData } from 'utils';
import { paramState } from './paramState';
import { userInfoState } from './userInfoState';

type DocMap = { [key: string]: Document };

export const allDocumentState = atom<DocMap>({
  key: 'allDocument',
  default: selector({
    key: 'allDocumentAsync',
    get: async ({ get }) => {
      const { uid } = get(userInfoState);
      return await fetchData<DocMap>({ destination: 'All', uid });
    },
  }),
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

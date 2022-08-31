import { db } from 'firebase-source';
import { doc, getDoc } from 'firebase/firestore';
import { atom, selector } from 'recoil';
import { IDocument } from 'types';
import { paramState } from './paramState';
import { userInfoState } from './userInfoState';

type DocMap = { [key: string]: IDocument };

const getAllDocumentData = async (uid: string): Promise<DocMap> => {
  if (uid) {
    const allDocSnap = await getDoc(doc(db, uid, 'All'));
    if (allDocSnap.exists()) {
      return allDocSnap.data().docMap;
    }
  }
  return {};
};

export const allDocumentState = atom<DocMap>({
  key: 'allDocument',
  default: selector({
    key: 'allDocumentAsync',
    get: async ({ get }) => {
      const { uid } = get(userInfoState);
      return await getAllDocumentData(uid);
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

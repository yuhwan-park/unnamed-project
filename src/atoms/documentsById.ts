import { selector } from 'recoil';
import { allDocumentState } from './allDocumentState';
import { docIdsState } from './docIdsState';

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

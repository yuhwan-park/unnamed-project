import { selector } from 'recoil';
import { allDocumentState } from './allDocumentState';
import { myListsState } from './myListsState';
import { docIdsByDateState } from './docIdsByDateState';

export const isLoadingState = selector({
  key: 'isLoadingState',
  get: ({ get }) => {
    const allDocuments = get(allDocumentState);
    const myLists = get(myListsState);
    const docIdsByDate = get(docIdsByDateState);

    return [docIdsByDate, myLists, allDocuments].some(
      ({ isLoading }) => isLoading,
    );
  },
});

import { selector } from 'recoil';
import { allDocumentState } from './allDocumentState';
import { docIdsByDateState } from './docIdsByDateState';
import { myListsState } from './myListsState';

export const isLoadingState = selector({
  key: 'isLoading',
  get: ({ get }) => {
    const allDoc = get(allDocumentState);
    const docIdsByDate = get(docIdsByDateState);
    const myLists = get(myListsState);
    return (
      !!allDoc['needLoad'] &&
      !!docIdsByDate['needLoad'] &&
      !!myLists['needLoad']
    );
  },
});

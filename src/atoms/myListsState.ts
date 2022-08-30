import { atom, selector } from 'recoil';
import { IMyList } from 'types';
import { paramState } from './paramState';

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

export const selectedListState = selector({
  key: 'selectedListSelector',
  get: ({ get }) => {
    const params = get(paramState);
    const lists = get(myListsState);

    return params['listId'] ? lists[params['listId']] : undefined;
  },
});

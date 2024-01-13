import { atom, selector } from 'recoil';
import { MyList } from '@types';
import { paramState } from './paramState';
import { snapshotEffect } from 'utils';

type MyListMap = { [key: string]: MyList };

export const myListsState = atom<MyListMap>({
  key: 'myLists',
  default: { isLoading: {} as MyList },
  effects: [snapshotEffect('Lists')],
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

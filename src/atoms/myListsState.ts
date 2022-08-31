import { db } from 'firebase-source';
import { doc, getDoc } from 'firebase/firestore';
import { atom, selector } from 'recoil';
import { IMyList } from 'types';
import { paramState } from './paramState';
import { userInfoState } from './userInfoState';

type MyListMap = { [key: string]: IMyList };

const getMyListsData = async (uid: string): Promise<MyListMap> => {
  if (uid) {
    const docSnap = await getDoc(doc(db, uid, 'Lists'));
    if (docSnap.exists()) {
      return docSnap.data();
    }
  }
  return {};
};

export const myListsState = atom<MyListMap>({
  key: 'myLists',
  default: selector({
    key: 'myListsAsync',
    get: async ({ get }) => {
      const { uid } = get(userInfoState);
      return await getMyListsData(uid);
    },
  }),
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

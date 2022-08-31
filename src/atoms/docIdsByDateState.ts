import { db } from 'firebase-source';
import { doc, getDoc } from 'firebase/firestore';
import { atom, selector } from 'recoil';
import { userInfoState } from './userInfoState';

type DocIdsByDate = { [key: string]: string[] };

const getDocIdsByDateData = async (uid: string): Promise<DocIdsByDate> => {
  if (uid) {
    const docSnap = await getDoc(doc(db, uid, 'Date'));
    if (docSnap.exists()) {
      return docSnap.data();
    }
  }
  return {};
};

export const docIdsByDateState = atom<DocIdsByDate>({
  key: 'docIdsByDate',
  default: selector({
    key: 'docIdsByDateAsync',
    get: async ({ get }) => {
      const { uid } = get(userInfoState);
      return await getDocIdsByDateData(uid);
    },
  }),
});

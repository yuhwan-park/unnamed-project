import { atom, selector } from 'recoil';
import { fetchData } from 'utils';
import { userInfoState } from './userInfoState';

type DocIdsByDate = { [key: string]: string[] };

export const docIdsByDateState = atom<DocIdsByDate>({
  key: 'docIdsByDate',
  default: selector({
    key: 'docIdsByDateAsync',
    get: async ({ get }) => {
      const { uid } = get(userInfoState);
      return await fetchData<DocIdsByDate>({ destination: 'Date', uid });
    },
  }),
});

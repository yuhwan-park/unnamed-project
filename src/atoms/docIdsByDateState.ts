import { atom } from 'recoil';

type DocIdsByDate = { [key: string]: string[] };

export const docIdsByDateState = atom<DocIdsByDate>({
  key: 'docIdsByDate',
  default: {},
});

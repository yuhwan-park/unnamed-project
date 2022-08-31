import { atom } from 'recoil';

export const docIdsState = atom<string[]>({
  key: 'docIds',
  default: [],
});

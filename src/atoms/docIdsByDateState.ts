import { atom } from 'recoil';

export const docIdsByDateState = atom<{ [key: string]: string[] }>({
  key: 'docIdsByDate',
  default: {},
});

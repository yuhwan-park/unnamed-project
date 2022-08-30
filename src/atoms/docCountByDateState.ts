import { atom } from 'recoil';

export const docCountByDateState = atom<{ [key: string]: number }>({
  key: 'documentCount',
  default: {},
});

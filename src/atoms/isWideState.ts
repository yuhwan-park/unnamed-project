import { atom } from 'recoil';

export const isWideState = atom({
  key: 'isWide',
  default: window.innerWidth > 1024,
});

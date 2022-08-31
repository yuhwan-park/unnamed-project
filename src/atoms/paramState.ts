import { Params } from 'react-router-dom';
import { atom } from 'recoil';

export const paramState = atom<Params<string>>({
  key: 'param',
  default: {},
});

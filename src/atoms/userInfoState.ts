import { atom } from 'recoil';
import { IUserState } from 'types';

export const userInfoState = atom<IUserState>({
  key: 'user',
  default: {
    displayName: '',
    uid: '',
    photoURL: '',
    email: '',
  },
});

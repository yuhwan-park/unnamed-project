import { UserInfo } from '@types';
import { atom } from 'recoil';

export const userInfoState = atom<UserInfo>({
  key: 'user',
  default: {
    displayName: '',
    uid: '',
    photoURL: '',
    email: '',
  },
});

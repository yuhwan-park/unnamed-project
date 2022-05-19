import dayjs from 'dayjs';
import { User } from 'firebase/auth';
import { atom } from 'recoil';

export const dateState = atom<dayjs.Dayjs>({
  key: 'date',
  default: dayjs(),
});

export const userState = atom<User | undefined>({
  key: 'user',
  default: undefined,
});

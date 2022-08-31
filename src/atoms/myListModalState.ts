import { atom } from 'recoil';

export const myListModalState = atom<'Edit' | 'Create' | 'Delete' | null>({
  key: 'myListModal',
  default: null,
});

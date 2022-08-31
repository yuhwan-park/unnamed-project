import { atom, selector } from 'recoil';

export const screenStatusState = atom<'All' | 'Date' | 'List'>({
  key: 'screenStatus',
  default: selector({
    key: 'screenStatus/selector',
    get: () => {
      const { href } = window.location;
      return href.includes('all')
        ? 'All'
        : href.includes('lists')
        ? 'List'
        : 'Date';
    },
  }),
});

import { atom, selector } from 'recoil';

export const isInitializedState = atom({
  key: 'isInitialized',
  default: {
    all: false,
    date: false,
    lists: false,
  },
});

export const isLoadingState = selector({
  key: 'isLoading',
  get: ({ get }) => {
    const isInitialized = get(isInitializedState);
    const values = Object.values(isInitialized);
    return values.filter(Boolean).length === values.length;
  },
});

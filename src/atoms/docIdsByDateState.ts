import { atom } from 'recoil';
import { snapshotEffect } from 'utils';

type DocIdsByDate = { [key: string]: string[] };

export const docIdsByDateState = atom<DocIdsByDate>({
  key: 'docIdsByDate',
  default: { needLoad: [] },
  effects: [snapshotEffect('Date')],
});

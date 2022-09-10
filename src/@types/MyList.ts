import { Timestamp } from 'firebase/firestore';

export interface MyList {
  title: string;
  createdAt: Timestamp;
  id: string;
  docIds: string[];
}

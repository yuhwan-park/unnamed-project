import { Timestamp } from 'firebase/firestore';
import { MyList } from './MyList';

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  isDone: boolean;
  isDeleted: boolean;
  isNote: boolean;
  priority: number;
  date: string;
  list: MyList | null;
}

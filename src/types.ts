import { Timestamp } from 'firebase/firestore';

export interface IDocument {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  isDone: boolean;
  isDeleted: boolean;
  isNote: boolean;
  priority: number;
  date: string;
  list: IMyList | null;
}
export interface IFormData {
  email: string;
  password: string;
  nickname?: string;
}

export interface ITaskFormData {
  title: string;
}

export interface IUserState {
  displayName: string | null;
  uid: string;
  photoURL: string | null;
  email: string | null;
}
export interface IMyList {
  title: string;
  createdAt: Timestamp;
  id: string;
}

export interface IAllDocumentState {
  [key: string]: IDocument;
}

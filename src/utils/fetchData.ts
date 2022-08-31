import { db } from 'firebase-source';
import { doc, getDoc } from 'firebase/firestore';

interface FetchDataParams {
  destination: 'All' | 'Lists' | 'Date';
  uid: string;
}

export const fetchData = async <T>({
  destination,
  uid,
}: FetchDataParams): Promise<T> => {
  if (uid) {
    const allDocSnap = await getDoc(doc(db, uid, destination));
    if (allDocSnap.exists()) {
      return allDocSnap.data() as Promise<T>;
    }
  }
  return {} as Promise<T>;
};

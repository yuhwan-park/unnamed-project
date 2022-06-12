import { doc } from 'firebase/firestore';
import { auth, db } from 'firebase-source';
import { IDocument } from 'types';

function useGetDocRef(item: IDocument) {
  if (!auth.currentUser || !item.date) return null;
  return doc(db, `${auth.currentUser.uid}/${item.date}/Document/${item.id}`);
}

export { useGetDocRef };

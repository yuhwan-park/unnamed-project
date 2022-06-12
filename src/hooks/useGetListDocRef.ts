import { doc } from 'firebase/firestore';
import { auth, db } from 'firebase-source';
import { IDocument } from 'types';

function useGetListDocRef(item: IDocument) {
  if (!auth.currentUser || !item.list) return null;
  return doc(db, `${auth.currentUser.uid}/Lists/${item.list.id}/${item.id}`);
}

export { useGetListDocRef };

import { auth, db } from 'firebase-source';
import { doc } from 'firebase/firestore';

function useGetAllDocRef(id: string) {
  if (!auth.currentUser) return null;
  return doc(db, `${auth.currentUser.uid}/All/Documents/${id}`);
}

export { useGetAllDocRef };

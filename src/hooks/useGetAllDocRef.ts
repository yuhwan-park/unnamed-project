import { auth, db } from 'firebase-source';
import { doc } from 'firebase/firestore';

function useGetAllDocRef() {
  if (!auth.currentUser) return null;
  return doc(db, `${auth.currentUser.uid}/All`);
}

export { useGetAllDocRef };

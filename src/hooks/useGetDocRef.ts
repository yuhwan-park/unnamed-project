import { doc } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { dateSelector } from 'atoms';
import { auth, db } from 'firebase-source';

function useGetDocRef(id: string | undefined) {
  const date = useRecoilValue(dateSelector);
  if (!auth.currentUser) return;
  return id ? doc(db, `${auth.currentUser.uid}/${date}/Document/${id}`) : null;
}

export { useGetDocRef };

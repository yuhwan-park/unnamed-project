import { User } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { dateSelector } from 'atoms';
import { auth, db } from 'firebase-source';

function useGetDocRef(id: string | undefined) {
  const date = useRecoilValue(dateSelector);
  return id
    ? doc(db, `${(auth.currentUser as User).uid}/${date}/Document/${id}`)
    : null;
}

export { useGetDocRef };

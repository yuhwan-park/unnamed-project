import { User } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { dateSelector } from '../atoms';
import { auth, db } from '../firebase';

function useGetDocRef(id: string) {
  const date = useRecoilValue(dateSelector);
  return doc(db, `${(auth.currentUser as User).uid}/${date}/Document/${id}`);
}

export { useGetDocRef };
